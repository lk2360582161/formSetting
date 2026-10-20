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
    rollupOptions: {
      output: {
        manualChunks: {
          'antd': ['ant-design-vue', '@ant-design/icons-vue'],
          'vendor': ['vue', 'lodash', 'vuedraggable']
        }
      }
    }
  },
  test: {
    environment: 'jsdom',  // 模拟浏览器环境
    globals: true,         // 不用每次导入 describe, it, expect
    setupFiles: ['./vitest.setup.js']  // 测试启动文件
  }
})