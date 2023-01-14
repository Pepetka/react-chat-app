import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		svgr({
			exportAsDefault: true,
		}),
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
