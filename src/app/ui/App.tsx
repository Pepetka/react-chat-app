import { memo, useCallback, useEffect } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getUserInited, userActions } from '@/entities/User';
import { useTheme } from '@/shared/hooks/useTheme';
import { NavBar } from '@/widgets/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoginPagePath, getRegisterPagePath } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { SideBar } from '@/widgets/SideBar';
import { Page } from '@/shared/ui/Page';

export const App = memo(() => {
	const inited = useSelector(getUserInited);
	const { theme } = useTheme();
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
		</div>
	);
});
