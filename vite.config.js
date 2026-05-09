import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    target: "es2015",
    sourcemap: false,
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