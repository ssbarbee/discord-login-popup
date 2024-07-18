import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'DiscordLoginPopup',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
    },
    plugins: [dts()]
});