import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Prefer 127.0.0.1 over localhost — on Windows, localhost→IPv6 often causes
  // Vite AggregateError ECONNREFUSED when Next is listening on a different stack.
  const rawTarget = env.VITE_API_PROXY_TARGET || "http://127.0.0.1:3001";
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
