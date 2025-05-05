import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  // 配置Vite的插件，这里使用了Vue官方提供的插件（支持SFC单文件组件）
  plugins: [vue()],

  // resolve选项用于配置模块解析规则，resolve是添加的别名
  resolve: {
    // alias选项用于设置路径别名（类似Webpack的alias）
    alias: [
      {
        // find: 定义别名匹配规则（这里用@符号作为别名）
        find: "@", 
        // replacement: 实际指向的路径（这里指向项目根目录下的/src目录）
        replacement: "/src" 
      }
    ]
  }
})
