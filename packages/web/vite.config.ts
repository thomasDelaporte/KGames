import { defineConfig } from 'vite';

import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
    plugins: [
        reactRefresh()
    ],

    build: {
        commonjsOptions: {
            exclude: '@kgames/common',
            include: []
        }
    }
});