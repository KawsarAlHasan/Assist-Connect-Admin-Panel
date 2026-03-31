import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],

  // server: {
  //   port: 3000,
  // },

  build: {
    chunkSizeWarningLimit: 1000, 

    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
