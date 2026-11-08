import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  // El frontend se publica bajo el nombre del repositorio en GitHub Pages.
  // En desarrollo local se conserva la ruta raíz.
  base: command === 'build' ? '/Exp1_S3_FrontendII/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Express actualiza este archivo al sincronizar el stock; no es un módulo del frontend.
      ignored: ['**/server/data/productos.json'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}));
