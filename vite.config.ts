import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  resolve: {
    alias: { '@': '/src' }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['last 2 Safari versions', 'last 2 Firefox versions'],
    }),
  ],
  server: {
    port: 3000,
  },
});
