import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // AQUI É A CORREÇÃO: Tem que criar o objeto "server"
  server: {
    port: 3000, // Agora sim funciona!
    host: true, // Libera o acesso externo
  },
});
