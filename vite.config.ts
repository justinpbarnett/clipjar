import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.chrome.json';

export default defineConfig({
  build: {
    outDir: 'dist-chrome',
    rollupOptions: {
      input: { offscreen: 'src/offscreen/offscreen.html' },
    },
  },
  plugins: [crx({ manifest })],
});
