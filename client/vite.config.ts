import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
