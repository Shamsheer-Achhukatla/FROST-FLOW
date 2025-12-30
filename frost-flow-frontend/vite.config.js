import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {}
  },
  build: {
    rollupOptions: {
      external: [], // Prevent Vite bundling random external modules
    },
  },
  server: {
    port: 5173,
  },
});
