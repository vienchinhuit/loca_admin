import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['js-cookie']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "core": path.resolve(__dirname, "./src/core"),
      "modules": path.resolve(__dirname, "./src/modules"),
      "assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    assetsInlineLimit: 0, // Đảm bảo rằng tệp font không bị inline thành base64
  },
});
