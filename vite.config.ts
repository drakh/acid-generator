import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  assetsInclude: ['**/*.md'],
  plugins: [react(), eslint({ fix: true })],
  base: '',
});
