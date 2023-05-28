import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import {
	getChatsPagePath,
	getFriendsPagePath,
	getGroupsListPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { AppLink } from '@/shared/ui/AppLink';

const StyledSidebar = styled.div`
	width: var(--sidebar-width);
`;

export const SideBar = memo(() => {
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);

	return (
		<StyledSidebar>
			<Flex direction="column" gap="8">
				<AppLink to={getMainPagePath()}>
					<Text text={t('Main page')} size="xl" />
				</AppLink>
				<AppLink to={getProfilePagePath(authData?.id ?? '')}>
					<Text text={t('My profile')} size="xl" />
				</AppLink>
				<AppLink to={getFriendsPagePath(authData?.id ?? '')}>
					<Text text={t('My friends')} size="xl" />
				</AppLink>
				<AppLink to={getChatsPagePath()}>
					<Text text={t('My chats')} size="xl" />
				</AppLink>
				<AppLink to={getGroupsListPagePath(authData?.id ?? '')}>
					<Text text={t('My groups')} size="xl" />
				</AppLink>
			</Flex>
		</StyledSidebar>
	);
});
