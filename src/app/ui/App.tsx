import { memo, useCallback, useEffect } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { userActions } from '@/entities/User';
import { useTheme } from '@/shared/hooks/useTheme';
import { NavBar } from '@/widgets/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoginPagePath } from '@/shared/const/router';

export const App = memo(() => {
	const { theme, changeTheme } = useTheme();
	const location = useLocation();
	const navigation = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initUser());
	}, [dispatch]);

	const onLogin = useCallback(() => {
		navigation(getLoginPagePath());
	}, [navigation]);

	return (
		<div data-testid="App" className={`App ${theme}`}>
			<NavBar onLogin={onLogin} currentPagePath={location.pathname} />
			<button onClick={changeTheme}>Theme</button>
			<AppRouter />
		</div>
	);
});
