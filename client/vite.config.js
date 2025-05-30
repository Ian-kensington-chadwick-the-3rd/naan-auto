import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base:'/',
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/graphql': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false
            }
        }
    },
    
})     