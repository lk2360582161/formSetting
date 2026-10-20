import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // 优化模板编译
        whitespace: 'condense'
      }
    }
  })],
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false // 禁用热更新错误覆盖层
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 2000, // 👈 新增：把警告阈值调大，眼不见心不烦
    rollupOptions: {
      output: {
        // 👇 修改：使用函数方式智能拆包，彻底解决循环依赖
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 只要涉及到 antd、vue 或 element 等 UI 库，全部塞进同一个文件
            if (id.includes('ant-design-vue') || id.includes('@ant-design') || id.includes('vue') || id.includes('@vue')) {
              return 'vendor-ui'
            }
            // 其他第三方工具库
            return 'vendor-utils'
          }
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js']
  }
})