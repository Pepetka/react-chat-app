import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import LinkOut from '@/shared/assets/link-out.svg';
import { getUserAuthData } from '@/entities/User';

const StyledList = styled.ul`
	list-style: circle;
	display: flex;
	flex-direction: column;
	width: auto;
`;

const appFeatures = [
	'Connect',
	'Create',
	'Share',
	'Rate',
	'Discuss',
	'Chat',
	'Discover',
	'Explore',
];

const MainPage = () => {
	const { t } = useTranslation('main');
	const isAuth = !!useSelector(getUserAuthData);

	return (
		<Flex
			data-testid="MainPage"
			direction="column"
			justify="center"
			align="center"
		>
			<Flex width="90%" direction="column" gap="16" align="center">
				<Text
					size={isMobile ? 'l' : 'xl'}
					title="ICE App"
					titleAlign="center"
					indent
					text={t('Description')}
				/>
				<Text size={isMobile ? 'l' : 'xl'} indent text={t('Features')} />
				<StyledList>
					{appFeatures.map((feature, index) => (
						<li>
							<Text key={index} text={t(feature)} size={isMobile ? 'm' : 'l'} />
						</li>
					))}
				</StyledList>
				{!isAuth && (
					<Flex width="90%" gap="8" justify="space-between" wrap="wrap">
						<AppLink to="/register">
							<Flex align="center">
								<Text size={isMobile ? 'm' : 'l'} text={t('Register')} />
								<Icon size="s" SvgIcon={LinkOut} />
							</Flex>
						</AppLink>
						<AppLink to="/login">
							<Flex align="center">
								<Text size={isMobile ? 'm' : 'l'} text={t('Login')} />
								<Icon size="s" SvgIcon={LinkOut} />
							</Flex>
						</AppLink>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default MainPage;
