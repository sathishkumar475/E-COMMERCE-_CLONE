import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@mui/material") || id.includes("@emotion")) {
            return "mui-vendor";
          }
          if (id.includes("react-router-dom")) {
            return "router";
          }
          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
            return "redux";
          }
        },
      },
    },
  },
});
