import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   dedupe: ['vue'],
  // },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'TSPro',
      formats: ['cjs', 'umd', 'es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
