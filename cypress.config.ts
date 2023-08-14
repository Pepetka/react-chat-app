import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'qu88mx',
	e2e: {
		baseUrl: 'http://localhost:5173',
	},
});
