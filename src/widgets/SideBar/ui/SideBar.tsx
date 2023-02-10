import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import {
	getChatsPagePath,
	getFriendsPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { AppLink } from '@/shared/ui/AppLink';

const StyledSidebar = styled.div`
	flex: 0 0 var(--sidebar-width);
`;

export const SideBar = memo(() => {
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);

	return (
		<StyledSidebar>
			<Flex direction="column" gap="8">
				<AppLink href={getMainPagePath()}>
					<Text text={t('Main page')} size="xl" />
				</AppLink>
				<AppLink href={getProfilePagePath(authData?.id ?? '')}>
					<Text text={t('My profile')} size="xl" />
				</AppLink>
				<AppLink href={getFriendsPagePath(authData?.id ?? '')}>
					<Text text={t('My friends')} size="xl" />
				</AppLink>
				<AppLink href={getChatsPagePath()}>
					<Text text={t('My chats')} size="xl" />
				</AppLink>
			</Flex>
		</StyledSidebar>
	);
});
