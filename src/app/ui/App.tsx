import { memo, useEffect } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { userActions } from '@/entities/User';
import { useTheme } from '@/shared/hooks/useTheme';

export const App = memo(() => {
	const { theme, changeTheme } = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initUser());
	}, [dispatch]);

	return (
		<div data-testid="App" className={`App ${theme}`}>
			<button onClick={changeTheme}>Theme</button>
			<AppRouter />
		</div>
	);
});
