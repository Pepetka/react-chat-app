import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/ui/App';
import { StoreProvider } from '@/app/provider/Store';
import { ThemeProvider } from '@/app/provider/Theme';
import { ErrorBoundary } from '@/app/provider/ErrorBoundary';
import { PageLoader } from '@/widgets/PageLoader';
import './app/styles/index.css';
import './shared/config/i18next/i18n';

export const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
	<StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<StoreProvider>
					<ThemeProvider>
						<Suspense fallback={<PageLoader />}>
							<App />
						</Suspense>
					</ThemeProvider>
				</StoreProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</StrictMode>,
);
