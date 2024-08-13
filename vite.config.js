import { resolve } from 'node:path';

export default {
  server: {
    port: 3333,
  },
  css: {
    devSourceMap: true,
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        /* Lo que hace es devolver la ruta completa absoluta C:\Users\NachoGrane\Desktop\Informática\Bootcamp-Full-Stack\Clases\clase.23\bc-71370-integrador-etapa-1 */
        alta: resolve('views/alta.html'),
        carrito: resolve('views/carrito.html'),
        contacto: resolve('views/contacto.html'),
        nosotros: resolve('views/nosotros.html'),
        inicio: resolve('index.html'),
      },
    },
  },
};
