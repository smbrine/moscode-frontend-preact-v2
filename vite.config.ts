import {defineConfig, splitVendorChunkPlugin} from 'vite'
import preact from '@preact/preset-vite'
import {compression} from 'vite-plugin-compression2'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(), splitVendorChunkPlugin(),
        // compression({algorithm: 'brotliCompress'}),
    ],
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

                    // if (id.includes('react-dom/server')) return '@react-router-server';
                    //
                    // if (id.includes('react-router-dom/server')) return '@react-router-dom-server'
                    //
                    // if (id.includes('react-router')) return '@react-router';
                    //
                    // if (id.includes('react-router-dom')) return '@react-router-dom'
                    //
                    // if (id.includes('preact-dom/server')) return '@preact-router-server';
                    //
                    // if (id.includes('preact-router-dom/server')) return '@preact-router-dom-server'
                    //
                    // if (id.includes('preact-router')) return '@preact-router';
                    //
                    // if (id.includes('preact-router-dom')) return '@preact-router-dom'

                    if (id.includes('axios')) return '@axios'

                    if (id.includes('PolicyView')) return '@cpv'

                },
            },
        },
    },
})
