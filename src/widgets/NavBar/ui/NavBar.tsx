import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { AppLink } from '@/shared/ui/AppLink';
import { getFriendsPagePath, getMainPagePath } from '@/shared/const/router';
import { Input } from '@/shared/ui/Input';
import LogoSvg from '@/shared/assets/logo.svg';
import SearchSvg from '@/shared/assets/search.svg';
import { getUserAuthData, userActions } from '@/entities/User';

interface INavBarProps {
	currentPagePath: string;
	onLogin?: () => void;
	onRegister?: () => void;
	onLogout?: () => void;
}

const StyledNavBar = styled.div`
	width: 100%;
	height: ${() =>
		isMobile ? 'var(--navbar-height-mobile)' : 'var(--navbar-height)'};
	background: var(--invert-bg-color);
	border-bottom: 2px solid rgba(0, 0, 0, 0.25);
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

	@media (max-width: 768px) {
		font-size: 32px;
	}
`;

export const NavBar = memo((props: INavBarProps) => {
	const { currentPagePath, onLogin, onRegister, onLogout } = props;
	const isSmallScreen = useMediaQuery({ maxWidth: 768 });
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
	const [search, setSearch] = useState('');

	const onChange = useCallback((value: string) => {
		setSearch(value);
	}, []);

	const onLogoutHandle = useCallback(() => {
		onLogout?.();
		dispatch(userActions.removeUser());
	}, [dispatch, onLogout]);

	const onSearch = useCallback(() => {
		navigate(getFriendsPagePath(authData?.id ?? '', search));
		setSearch('');
	}, [authData, navigate, search]);

	return (
		<StyledNavBar>
			<Flex
				justify="space-between"
				align="center"
				width={isSmallScreen ? '90%' : '80%'}
				height="100%"
			>
				<Flex
					align="center"
					justify="space-between"
					width={isSmallScreen ? 'auto' : '600px'}
				>
					<AppLink to={getMainPagePath()}>
						<Flex align="center" width="auto">
							<Icon size={isSmallScreen ? 'm' : 'l'} SvgIcon={LogoSvg} invert />
							<LogoName>ICE</LogoName>
						</Flex>
					</AppLink>
					{authData && isDesktopOrLaptop && (
						<Flex FlexTag="form" onSubmit={onSearch} width="auto">
							<Input
								data-testid="NavBar.input"
								aria-label="Search friends"
								border={false}
								paddingInline="20px"
								value={search}
								onChange={onChange}
								width="370px"
								height="50px"
								name="friend"
								borderRadius="25px"
								SvgIcon={SearchSvg}
								onClick={onSearch}
							/>
						</Flex>
					)}
				</Flex>
				{authData ? (
					<Button
						data-testid="NavBar.logout"
						aria-label="Logout"
						onClick={onLogoutHandle}
						theme={'outline'}
						width={isSmallScreen ? '100px' : '140px'}
						height={isSmallScreen ? '50px' : '70px'}
						invert
					>
						<Text
							text={t('Log Out')}
							theme="primary-invert"
							textAlign="center"
							size={isSmallScreen ? 'm' : 'l'}
						/>
					</Button>
				) : (
					<Flex width="auto">
						<Button
							aria-label="Login"
							onClick={onLogin}
							theme={currentPagePath === '/login' ? 'outline' : 'clear'}
							width={isSmallScreen ? '100px' : '140px'}
							height={isSmallScreen ? '50px' : '70px'}
							invert
						>
							<Text
								text={t('Log In')}
								theme="primary-invert"
								textAlign="center"
								size={isSmallScreen ? 'm' : 'l'}
							/>
						</Button>
						<Button
							aria-label="Signup"
							onClick={onRegister}
							theme={currentPagePath === '/register' ? 'outline' : 'clear'}
							width={isSmallScreen ? '100px' : '140px'}
							height={isSmallScreen ? '50px' : '70px'}
							invert
						>
							<Text
								text={t('Sign Up')}
								theme="primary-invert"
								textAlign="center"
								size={isSmallScreen ? 'm' : 'l'}
							/>
						</Button>
					</Flex>
				)}
			</Flex>
		</StyledNavBar>
	);
});
