import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Prefer LAN / 127.0.0.1 over localhost — Windows localhost→IPv6 often
  // causes Vite AggregateError ECONNREFUSED when Next listens on IPv4 only.
  const rawTarget = (env.VITE_API_PROXY_TARGET || "http://192.168.1.11:3000").trim();
  const apiTarget = rawTarget.replace("://localhost", "://127.0.0.1");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
