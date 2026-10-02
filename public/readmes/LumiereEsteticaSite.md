# Lumière | Clínica de Estética (React + TypeScript + Vite)

Landing page premium para clínica de estética. GSAP para animações, componentizado e tipado.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## Stack

- React 18 + TypeScript
- Vite 6
- GSAP 3 + ScrollTrigger (parallax, reveals, counters, marquee, carrossel)

## Estrutura

```
src/
  App.tsx                 orquestra GSAP (parallax, reveals, marquee, hero intro)
  main.tsx                entrypoint
  index.css               design system + estilos globais
  data/content.ts         serviços, depoimentos, FAQ, stats, WhatsApp (fonte única)
  hooks/useReducedMotion.ts
  components/
    Cursor.tsx            cursor custom + botões magnéticos
    Preloader.tsx         intro animada
    Nav.tsx               nav sticky + menu mobile
    Hero.tsx  Marquee.tsx  About.tsx  Services.tsx
    Stats.tsx             counters animados (ScrollTrigger)
    BeforeAfter.tsx       slider antes/depois (mouse + touch)
    Testimonials.tsx      carrossel infinito
    Gallery.tsx  Faq.tsx  Cta.tsx  Footer.tsx
    Icons.tsx             SVGs
```

## Trocar antes de entregar

Tudo centralizado em `src/data/content.ts`:

- `WHATSAPP` e `PHONE_LABEL` — número real
- `SERVICES`, `TESTIMONIALS`, `FAQS`, `STATS`, `GALLERY`

Marca "Lumière": buscar em `Nav.tsx`, `Preloader.tsx`, `Footer.tsx`, `index.html`.
Imagens: URLs Unsplash → trocar por fotos reais do cliente.

## Acessibilidade / performance

- `prefers-reduced-motion` respeitado (todas as animações caem para estado estático)
- Responsivo 375 / 768 / 1024 / 1440
- Contraste AA, foco visível
