import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/ui/App';
import { StoreProvider } from '@/app/provider/Store';
import { ThemeProvider } from '@/app/provider/Theme';
import './app/styles/index.css';
import './shared/config/i18next/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<ThemeProvider>
					<Suspense fallback="...">
						<App />
					</Suspense>
				</ThemeProvider>
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>,
);
