import { defineConfig } from 'vite';
const path = require('path');

process.env.BROWSER = 'google chrome canary';

// https://vitejs.dev/config/
export default defineConfig({
	root: path.resolve(__dirname, 'src'),
	base: './',
	server: {
		open: '/index.html'
	},
	plugins: [],
	build: {
		emptyOutDir: true,
		outDir: path.resolve(__dirname, 'dist'),
		lib: {
			entry: path.resolve(__dirname, 'lib/index.js'),
			name: 'getUniqueMonster',
			fileName: format => `monster-mash.${format}.js`
		}
	}
});
