import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { GenerateSWOptions } from 'workbox-build/src/types';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

const getCache = ({
	name,
	pattern,
	handler = 'NetworkFirst',
}: {
	name: string;
	pattern: RegExp;
	handler?: GenerateSWOptions['runtimeCaching'][number]['handler'];
}): GenerateSWOptions['runtimeCaching'][number] => ({
	urlPattern: pattern,
	handler,
	options: {
		cacheName: name,
		expiration: {
			maxEntries: 500,
			maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
		},
		cacheableResponse: {
			statuses: [200],
		},
	},
});

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			svgr({
				exportAsDefault: true,
			}),
			react(),
			VitePWA({
				registerType: 'autoUpdate',
				workbox: {
					globPatterns: [
						'**/*.{js,css,html,ico,png,webp,jpg,svg,json,txt,woff2}',
					],
					runtimeCaching: [
						getCache({
							name: 'main-request-cache',
							pattern: /^https:\/\/vlad-is-love\.ru\/profile.+/,
						}),
						getCache({
							name: 'main-request-cache',
							pattern: /^https:\/\/vlad-is-love\.ru\/relations.+/,
						}),
						getCache({
							name: 'main-request-cache',
							pattern: /^https:\/\/vlad-is-love\.ru\/social.+/,
						}),
						getCache({
							name: 'main-request-cache',
							pattern: /^https:\/\/vlad-is-love\.ru\/friends.+/,
						}),
						getCache({
							name: 'images',
							pattern: /\.(?:png|jpg|webp|svg)$/,
							handler: 'CacheFirst',
						}),
					],
				},
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
