import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/components/**/*.vue')
      ],
      // exclude: ['src/main.ts'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-openlayers-styled-controls',
      cssFileName: 'styles',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'vue3-openlayers', 'ol', 'ol-contextmenu', 'ol-ext'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue3-openlayers': 'Vue3OpenLayers',
          ol: 'ol',
          'ol-contextmenu': 'olContextMenu',
          'ol-ext': 'olExt'
        }
      }
    }
  }
})
