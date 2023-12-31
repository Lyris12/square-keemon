import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/index.tsx'),
      name: 'square-keemon',
      formats: ['es', 'umd'],
      fileName: (format: string) => `square-keemon.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
