import { memo, useCallback, useEffect } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { userActions } from '@/entities/User';
import { useTheme } from '@/shared/hooks/useTheme';
import { NavBar } from '@/widgets/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoginPagePath, getRegisterPagePath } from '@/shared/const/router';

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

	const onRegister = useCallback(() => {
		navigation(getRegisterPagePath());
	}, [navigation]);

	return (
		<div className={`App ${theme}`}>
			<NavBar
				onLogin={onLogin}
				onRegister={onRegister}
				currentPagePath={location.pathname}
			/>
			<button onClick={changeTheme}>Theme</button>
			<AppRouter />
		</div>
	);
});
