import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual effects with deterministic frames, visibility and canvas APIs.
function mount(file, component, { mobile = true, reduced = false } = {}) {
  let draws = 0;
  let resize;
  let intersect;
  let cleanup;
  const frames = new Map();
  const listeners = new Map();
  let nextFrame = 0;
  const context = new Proxy({}, {
    get: (_, key) => key === 'fill' || key === 'drawArrays' ? () => draws++
      : key === 'getShaderParameter' || key === 'getProgramParameter' ? () => true
      : key.startsWith('create') ? () => ({}) : () => {},
    set: () => true,
  });
  const canvas = { clientWidth: 390, clientHeight: 844, getContext: () => context };
  const host = { getBoundingClientRect: () => ({ width: 390, height: 844 }) };
  const refs = component === 'GravityStars' ? [host, canvas] : [canvas];
  const document = { hidden: false, visibilityState: 'visible',
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: name => listeners.delete(name) };
  const requestAnimationFrame = callback => { frames.set(++nextFrame, callback); return nextFrame; };
  const sandbox = {
    exports: {}, console, Float32Array, Math, performance: { now: () => 0 }, document,
    window: { devicePixelRatio: 3, matchMedia: () => ({ matches: mobile }),
      addEventListener() {}, removeEventListener() {} },
    requestAnimationFrame, cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} disconnect() {} },
    IntersectionObserver: class { constructor(callback) { intersect = callback; } observe() {} disconnect() {} },
    require: name => name === 'react' ? {
      useRef: () => ({ current: refs.shift() }), useEffect: effect => { cleanup = effect(); },
    } : name === 'motion/react' ? { useReducedMotion: () => reduced }
      : { jsx: () => null, jsxs: () => null },
  };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, sandbox);
  sandbox.exports[component]({});
  return {
    canvas, frames, get draws() { return draws; }, cleanup: () => cleanup(),
    resize: () => resize(), intersect: visible => intersect([{ isIntersecting: visible }]),
    visibility: visible => {
      document.hidden = !visible;
      document.visibilityState = visible ? 'visible' : 'hidden';
      listeners.get('visibilitychange')();
    },
    tick: time => {
      const pending = [...frames]; frames.clear();
      for (const [, callback] of pending) callback(time);
    },
  };
}

const starsFile = 'src/components/ui/gravity-stars.tsx';
const silkFile = 'src/components/silk-background.tsx';
const stars = mount(starsFile, 'GravityStars');
assert.equal(stars.canvas.width, 390, 'Mobile particles must cap canvas resolution');
assert.equal(stars.draws, 72, 'Two initial draws must each contain only 36 mobile stars');
assert.equal(stars.frames.size, 0, 'Offscreen sections must not start animation');
stars.intersect(true);
stars.tick(100);
const starDraws = stars.draws;
stars.tick(116);
assert.equal(stars.draws, starDraws, 'Mobile particle animation must throttle frames');
stars.tick(134);
assert.equal(stars.draws, starDraws + 36);
stars.intersect(false);
stars.visibility(false); stars.visibility(true);
assert.equal(stars.frames.size, 0, 'Returning to a visible tab must not restart offscreen particles');
stars.cleanup();

const silk = mount(silkFile, 'SilkBackground');
assert.equal(silk.canvas.width, 390, 'Mobile background must cap canvas resolution');
silk.tick(100); silk.tick(116);
assert.equal(silk.draws, 1, 'Mobile background must throttle frames');
silk.tick(134);
assert.equal(silk.draws, 2);
silk.visibility(false);
assert.equal(silk.frames.size, 0, 'Hidden tabs must stop rendering');
silk.cleanup();

for (const [file, component] of [[starsFile, 'GravityStars'], [silkFile, 'SilkBackground']]) {
  const effect = mount(file, component, { reduced: true });
  if (component === 'GravityStars') effect.intersect(true);
  effect.tick(100);
  assert.equal(effect.frames.size, 0, 'Reduced motion must not run a continuous animation');
  if (component === 'SilkBackground') {
    const previousDraws = effect.draws;
    effect.canvas.clientWidth = 400;
    effect.resize(); effect.tick(200);
    assert.equal(effect.draws, previousDraws + 1, 'Static background must redraw after resize');
    assert.equal(effect.frames.size, 0);
  }
  effect.cleanup();
}
const desktop = mount(silkFile, 'SilkBackground', { mobile: false });
assert.equal(desktop.canvas.width, 780, 'Desktop resolution must retain its existing DPR cap');
desktop.tick(100); desktop.tick(116);
assert.equal(desktop.draws, 2, 'Desktop must retain full frame rate');
desktop.cleanup();
console.log('Verified mobile animation limits, offscreen/hidden pauses, reduced motion and desktop behavior.');
