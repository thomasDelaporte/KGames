import { defineConfig } from 'vite';

import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
    plugins: [
        reactRefresh()
    ],
    
    optimizeDeps: {
        include: [ '@kgames/common' ]
    },

    build: {
        commonjsOptions: {
            exclude: '@kgames/common',
            include: []
        }
    }
});