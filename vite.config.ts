import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import imagemin from 'vite-plugin-imagemin';
import babel from 'vite-plugin-babel';


export default defineConfig({
  plugins: [
    react(),
    visualizer({ brotliSize: true, open: true }),
    babel({
      babelConfig: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["> 1%", "last 2 versions", "not dead", "IE 11"],
              },
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
      },
    }),
    imagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      jpegTran: { progressive: true },
      webp: { quality: 75 },
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
