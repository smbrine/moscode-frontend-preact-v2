import {defineConfig, splitVendorChunkPlugin} from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
    plugins: [
        preact(), splitVendorChunkPlugin(),
    ],
    base: process.env.CDN_URL,
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime'
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) return id.toString().split('node_modules/')[1].split('/')[0].toString();

                    if (id.includes('axios')) return '@axios'

                    if (id.includes('PolicyView')) return '@cpv'

                },
            },
        },
    },
})
