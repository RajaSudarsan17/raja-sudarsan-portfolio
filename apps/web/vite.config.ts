import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Heavy libs get their own cached chunks; 3D never blocks first paint.
        manualChunks: {
          motion: ["motion"],
        },
      },
    },
  },
});
