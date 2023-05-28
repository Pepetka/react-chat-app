import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
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
	define: {
		__API__:
			mode === 'development'
				? JSON.stringify(' http://192.168.31.58:8000/')
				: JSON.stringify('https://react-chat-app-server.vercel.app/'),
	},
}));
