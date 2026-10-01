/** Decorative chrome rim used inside interactive controls. */
export function BorderChromeRing({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`border-chrome-ring ${className}`.trim()}
    />
  );
}

export default BorderChromeRing;
