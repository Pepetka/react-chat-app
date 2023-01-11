import { memo } from 'react';
import { AppRouter } from '../provider/Router/ui/AppRouter';
import { NavLink, useLocation } from 'react-router-dom';
import {
	getLoginPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import styled from 'styled-components';

const NavBar = styled.div`
	display: flex;
	gap: 16px;
`;

export const App = memo(() => {
	const location = useLocation();

	return (
		<div data-testid="App">
			<NavBar>
				{location.pathname !== getProfilePagePath('1') && (
					<NavLink to={getProfilePagePath('1')}>to Profile page</NavLink>
				)}
				{location.pathname !== getMainPagePath() && (
					<NavLink to={getMainPagePath()}>to Main page</NavLink>
				)}
				{location.pathname !== getLoginPagePath() && (
					<NavLink to={getLoginPagePath()}>to Login page</NavLink>
				)}
			</NavBar>
			<AppRouter />
		</div>
	);
});
