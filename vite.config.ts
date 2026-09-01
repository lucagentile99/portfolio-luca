import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Base relativa: el build (`sitio-listo-para-ver/`) debe poder abrirse
  // haciendo doble clic en index.html (protocolo file://) además de
  // publicarse en un hosting real. Con base absoluta ("/") los assets
  // (JS, CSS, imágenes, CV) se resuelven contra la raíz del sistema de
  // archivos al abrir el HTML directamente y todo se rompe en silencio
  // (se ve la página sin estilos y con el texto alternativo de las
  // imágenes). Con base relativa ("./") funciona en los dos casos.
  base: "./",
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
