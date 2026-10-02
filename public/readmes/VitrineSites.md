# Vitrine Sites

Landing page + orçamento via WhatsApp para negócios locais. Página única em React (Vita), 3 sites de exemplo estáticos, deploy em Cloudflare Pages.

![React](/github/VitrineSites/0fb4deee70e5bd43.svg)
![Vite](/github/VitrineSites/041d3d64f67facc2.svg)
![Deploy](/github/VitrineSites/5ff99f4fc62b408c.svg)
![License](/github/VitrineSites/2ee9f3578fe19f80.svg)

---

## O que é

Site de captação. Cliente entra, vê benefícios/planos/exemplos, clica → cai no WhatsApp com mensagem pronta. Zero backend, zero formulário. Conversão via `wa.me`.

## Stack

- React 18.3 + Vite 5.4
- Sem dependências extras (router próprio, ícones inline, CSS puro)
- Fontes: Fraunces + Inter (Google Fonts)

## Rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # gera dist/
npm run preview
```

## Deploy — Cloudflare Pages

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework preset | Vite |

`public/_redirects` (`/*  /index.html  200`) faz fallback SPA. `public/exemplos/*.html` publicados como estão.

## Rotas

- `/` → site principal
- `/exemplos/vertice-automoveis.html` → Vértice Automóveis (concessionária)
- `/exemplos/noir-atelier.html` → Noir Atelier (salão)
- `/exemplos/casa-yang.html` → Casa Yang (restaurante)

Seções internas navegam por âncora (`#inicio`, `#servicos`, `#exemplos`, `#planos`, `#pagamento`, `#depoimentos`, `#faq`). Exemplos abrem em nova aba.

## Estrutura

```
react/
├── index.html              # shell + fontes + meta/OG
├── vite.config.js          # plugin-react, outDir dist
├── package.json
├── src/
│   ├── main.jsx            # bootstrap React
│   ├── App.jsx             # página inteira (seções, planos, FAQ, Pix)
│   ├── data.js             # conteúdo: BIZ, MSG, planos, FAQ, ícones, mensagens WhatsApp
│   ├── rawMarkup.js        # mockups do hero (notebook + celular) e SVG do mapa
│   └── index.css           # design system
└── public/
    ├── _redirects          # SPA fallback
    └── exemplos/           # 3 sites-demo estáticos (HTML puro)
        ├── vertice-automoveis.html
        ├── noir-atelier.html
        └── casa-yang.html
```

## Configurar o negócio

Edite `src/data.js`:

- `BIZ` → `whatsapp`, `whatsappDisplay`, `email`
- `MSG` → mensagens pré-preenchidas de cada botão
- Chave Pix = `BIZ.email` (via `PIX_KEY`)

Planos, preços, benefícios, depoimentos e FAQ também vivem em `data.js` (`PLANS`, `COMPARE`, `BENEFITS`, `QUOTES`, `FAQ`, `AMOUNTS`).

## Segurança pagamento

Site não pede nem armazena cartão. Cartão → link do gateway (PCI-DSS, tokenização). Pix → chave = e-mail, comprovante via WhatsApp.

## Licença

MIT.
