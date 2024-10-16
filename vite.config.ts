import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const reactPlugin = react();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin],
  worker: {
    plugins: () => [reactPlugin],
    format: 'es',
  },
});
