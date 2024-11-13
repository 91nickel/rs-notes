import path from 'path'
import { defineConfig, /*normalizePath*/ } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: normalizePath(path.resolve(__dirname, './src/assets/')),
        //             dest: normalizePath(path.resolve(__dirname, './dist/src'))
        //         }
        //     ]
        // }),
        react(),
        VitePWA({
            // registerType: 'autoUpdate',
            registerType: 'prompt',
            devOptions: {
                enabled: true,
            },
            // base: '/',
            // srcDir: 'src',
            // filename: 'sw.ts',
            // injectRegister: 'auto',
            includeAssets: [
                '/favicon.ico',
                '/apple-touch-icon.png',
            ],
            // strategies: 'injectManifest',
            // injectManifest: {
            //     minify: false,
            //     enableWorkboxModulesLogs: true,
            // },
            manifest: {
                name: 'Notes',
                short_name: 'Notes',
                description: 'RS Notes app',
                theme_color: '#FFFFFF',
                display: 'standalone',
                start_url: '/',
                orientation: 'portrait-primary',
                icons: [
                    {
                        'src': '512x512.png',
                        'sizes': '512x512',
                        'type': 'image/png',
                        'purpose': 'any maskable',
                    },
                    {
                        'src': '192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png',
                    },
                    {
                        'src': '144x144.png',
                        'sizes': '144x144',
                        'type': 'image/png',
                    },
                    {
                        'src': '96x96.png',
                        'sizes': '96x96',
                        'type': 'image/png',
                    },
                    {
                        'src': '72x72.png',
                        'sizes': '72x72',
                        'type': 'image/png',
                    },
                    {
                        'src': '48x48.png',
                        'sizes': '48x48',
                        'type': 'image/png',
                    },
                ],
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern", "legacy"
                importers: [
                    // ...
                ],
            },
        },
    },
})
