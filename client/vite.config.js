import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';


export default defineConfig({
    plugins: [
        react()

    ],
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
    build: {
        // Enable compression in the production build
        rollupOptions: {
            output: {
                // Here, Vite should handle text compression automatically in production
            },
        },
    },


})        // viteCompression({
        //     algorithm: 'brotliCompress',
        //     ext: '.br',
        //     threshold: 1024,
        //     deleteOriginFile:false,
        //     filter: /\.(js|mjs|json|css|html|svg|webp)$/i,
        // }),