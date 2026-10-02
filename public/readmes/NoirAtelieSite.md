# Noir Atelier — React

Site do Noir Atelier (salão de alta costura) reconstruído em **React + Vite + Framer Motion**,
com estética dark refinada, animações suaves e formulário de agendamento com validação.

## Como rodar

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # gera a versão de produção em /dist
npm run preview  # pré-visualiza o build
```

## Estrutura

```
src/
├── main.jsx            # ponto de entrada
├── App.jsx             # composição das seções
├── styles.css          # design system + estilos
├── data.jsx            # conteúdo (serviços, preços, equipe, ícones…)
├── hooks/
│   ├── useScrolled.js  # estado do header ao rolar
│   └── useCountUp.js   # contadores animados (com decimais)
└── components/
    ├── Header.jsx  Hero.jsx  Marquee.jsx  About.jsx
    ├── Services.jsx  Gallery.jsx  Prices.jsx  Team.jsx
    ├── Quotes.jsx  Booking.jsx  Footer.jsx  Reveal.jsx
```

## Destaques
- Formulário de agendamento controlado, com validação e mensagens de erro animadas.
- Hero com Ken Burns, revelação em cascata e sublinhado dourado animado.
- Galeria em preto e branco que ganha cor no hover.
- Contadores animados, marquee com pausa no hover e microinterações nos cards.
- Acessibilidade: skip link, foco visível, `prefers-reduced-motion`, menu mobile acessível.
