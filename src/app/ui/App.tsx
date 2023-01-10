import { memo } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';

export const App = memo(() => {
	return (
		<div data-testid="App">
			<AppRouter />
		</div>
	);
});
