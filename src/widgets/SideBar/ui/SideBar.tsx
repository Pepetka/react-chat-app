import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { getMainPagePath, getProfilePagePath } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import styled from 'styled-components';

const StyledSidebar = styled.div`
	flex: 0 0 var(--sidebar-width);
`;

export const SideBar = memo(() => {
	const authData = useSelector(getUserAuthData);

	return (
		<StyledSidebar>
			<Flex direction="column" gap="8">
				<NavLink to={getMainPagePath()}>
					<Text text="Main page" size="xl" />
				</NavLink>
				<NavLink to={getProfilePagePath(authData?.id ?? '')}>
					<Text text="My profile" size="xl" />
				</NavLink>
			</Flex>
		</StyledSidebar>
	);
});
