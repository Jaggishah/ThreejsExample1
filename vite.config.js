// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Specify the entry point of your application
  // This should point to your main JavaScript file
  // If your main file is named index.js, you can omit the "index.js" part
  // Vite will automatically look for index.js in your root directory
  // You can also use a different entry point if needed
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'public',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  assetsInclude: ['**/*.glb'], // Include .glb files
});
