import { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { useTheme } from '@/shared/hooks/useTheme';
import { NavBar } from '@/widgets/NavBar';
import { getLoginPagePath, getRegisterPagePath } from '@/shared/const/router';
import { Page } from '@/widgets/Page';
import { ControlPanel } from '@/widgets/ControlPanel';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { useInitAppMutation, useTermAppMutation } from '../api/appApi';

export const App = memo(() => {
	const inited = useSelector(getUserInited);
	const authData = useSelector(getUserAuthData);
	const { theme } = useTheme();
	const location = useLocation();
	const navigation = useNavigate();
	const dispatch = useAppDispatch();
	const [initSocketUser] = useInitAppMutation();
	const [termSocketUser] = useTermAppMutation();

	useEffect(() => {
		if (authData) {
			initSocketUser({ userId: authData.id });
		}
	}, [authData, initSocketUser]);

	useEffect(() => {
		dispatch(userActions.initUser());
	}, [dispatch]);

	const onLogin = useCallback(() => {
		navigation(getLoginPagePath());
	}, [navigation]);

	const onLogout = useCallback(() => {
		termSocketUser();
	}, [termSocketUser]);

	const onRegister = useCallback(() => {
		navigation(getRegisterPagePath());
	}, [navigation]);

	return (
		<div className={`App ${theme}`} data-testid="App">
			<NavBar
				onLogin={onLogin}
				onLogout={onLogout}
				onRegister={onRegister}
				currentPagePath={location.pathname}
			/>
			{inited && (
				<Page currentPagePath={location.pathname}>
					<AppRouter />
				</Page>
			)}
			<ControlPanel />
		</div>
	);
});
