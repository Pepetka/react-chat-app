import { memo, useCallback, useEffect, useRef } from 'react';
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
import { useSetOnlineMutation } from '../api/appApi';

export const App = memo(() => {
	const inited = useSelector(getUserInited);
	const authData = useSelector(getUserAuthData);
	const { theme } = useTheme();
	const location = useLocation();
	const navigation = useNavigate();
	const dispatch = useAppDispatch();
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [setOnline] = useSetOnlineMutation();

	useEffect(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		if (authData) {
			intervalRef.current = setInterval(() => {
				setOnline({ userId: authData.id });
			}, 5000);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [authData, setOnline]);

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
		<div className={`App ${theme}`} data-testid="App">
			<NavBar
				onLogin={onLogin}
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
