import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/ui/App';
import { StoreProvider } from '@/app/provider/Store';
import { ThemeProvider } from '@/app/provider/Theme';
import './app/styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>,
);
