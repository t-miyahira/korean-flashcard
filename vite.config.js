import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 'korean-flashcard' の部分は GitHub リポジトリ名に合わせてください
export default defineConfig({
  plugins: [react()],
  base: '/korean-flashcard/',
})
