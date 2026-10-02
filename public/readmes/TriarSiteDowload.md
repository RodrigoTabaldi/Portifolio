# Triar — site de apresentação e downloads

Site institucional separado do aplicativo principal, construído com Next.js, React e TypeScript.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Habilitar os downloads

Copie `.env.example` para `.env.local` e informe uma URL pública para cada instalador ou loja. Plataformas sem URL permanecem visíveis como **Em preparação**, evitando links quebrados.

```env
NEXT_PUBLIC_ANDROID_DOWNLOAD_URL=https://exemplo.com/Triar.apk
NEXT_PUBLIC_IOS_DOWNLOAD_URL=https://apps.apple.com/...
NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL=https://exemplo.com/Triar.exe
NEXT_PUBLIC_MACOS_DOWNLOAD_URL=https://exemplo.com/Triar.pkg
```

## Build

```bash
npm run build
```
