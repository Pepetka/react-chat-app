import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import LogoSvg from '@/shared/assets/logo.svg';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { getUserAuthData, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface INavBarProps {
	currentPagePath: string;
	onLogin?: () => void;
	onRegister?: () => void;
}

const StyledNavBar = styled.div`
	width: 100%;
	height: var(--navbar-height);
	background: var(--invert-bg-color);
	box-shadow: 0 6px 4px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoName = styled.div`
	font-family: var(--font-family-main);
	font-size: 50px;
	line-height: 58px;
	font-weight: 900;
	color: var(--invert-primary-color);
`;

export const NavBar = memo((props: INavBarProps) => {
	const { currentPagePath, onLogin, onRegister } = props;
	const authData = useSelector(getUserAuthData);
	const dispatch = useAppDispatch();

	const onLogout = useCallback(() => {
		dispatch(userActions.removeUser());
	}, [dispatch]);

	return (
		<StyledNavBar>
			<Flex justify="space-between" width="80%">
				<Flex align="center">
					<Icon SvgIcon={LogoSvg} invert />
					<LogoName>ICE</LogoName>
				</Flex>
				{authData ? (
					<Button
						onClick={onLogout}
						theme={'outline'}
						width="120px"
						height="70px"
						invert
					>
						<Text text="Log Out" theme="invert" textAlign="center" size="l" />
					</Button>
				) : (
					<Flex width="auto">
						<Button
							onClick={onLogin}
							theme={currentPagePath === '/login' ? 'outline' : 'clear'}
							width="120px"
							height="70px"
							invert
						>
							<Text text="Log In" theme="invert" textAlign="center" size="l" />
						</Button>
						<Button
							onClick={onRegister}
							theme={currentPagePath === '/register' ? 'outline' : 'clear'}
							width="140px"
							height="70px"
							invert
						>
							<Text text="Sign Up" theme="invert" textAlign="center" size="l" />
						</Button>
					</Flex>
				)}
			</Flex>
		</StyledNavBar>
	);
});
