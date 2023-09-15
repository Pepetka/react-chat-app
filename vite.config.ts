import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			svgr({
				exportAsDefault: true,
			}),
			react(),
			dts({
				insertTypesEntry: true,
			}),
		],
		server: {
			host: true,
			strictPort: true,
			port: 5173,
			watch: {
				usePolling: true,
			},
		},
		preview: {
			host: true,
			port: 8080,
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		define: {
			__API__: JSON.stringify(env.VITE_API),
			__API_SOCKET__: JSON.stringify(env.VITE_API_SOCKET),
			__MOCK_SOCKET__: false,
		},
	};
});
