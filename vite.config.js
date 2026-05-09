import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: "es2015",
    sourcemap: true,
  },

  server: {
    proxy: {
      "/api": {
        target: "https://my-project-backend-ee4t.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});