import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "fs",
        "path",
        "crypto",
        "jsonwebtoken",
      ],
    },
  },
  server: {
    port: 5173,
  },
});
