import { FC, memo, SVGProps, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';
import HomeIcon from '@/shared/assets/home.svg';
import ProfileIcon from '@/shared/assets/profile.svg';
import FriendsIcon from '@/shared/assets/friends.svg';
import ChatsIcon from '@/shared/assets/chats.svg';
import GroupsIcon from '@/shared/assets/groups.svg';
import { Button } from '@/shared/ui/Button';
import {
	getChatsPagePath,
	getFriendsPagePath,
	getGroupsListPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '@/shared/const/router';
import { Icon } from '@/shared/ui/Icon';
import { getUserAuthData } from '@/entities/User';

interface IBottomBarProps {
	currentPagePath: string;
}

const StyledBottomBar = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: var(--invert-bg-color);
	border-top: 2px solid rgba(0, 0, 0, 0.25);
	height: ${() =>
		isMobile ? 'var(--navbar-height-mobile)' : 'var(--navbar-height)'};
`;

export const BottomBar = memo((props: IBottomBarProps) => {
	const { currentPagePath } = props;
	const authData = useSelector(getUserAuthData);
	const navigate = useNavigate();

	const pathObject: Record<string, FC<SVGProps<SVGSVGElement>>> = useMemo(
		() => ({
			[getMainPagePath()]: HomeIcon,
			[getProfilePagePath(authData?.id ?? '')]: ProfileIcon,
			[getFriendsPagePath(authData?.id ?? '')]: FriendsIcon,
			[getChatsPagePath()]: ChatsIcon,
			[getGroupsListPagePath(authData?.id ?? '')]: GroupsIcon,
		}),
		[authData?.id],
	);

	const onClick = useCallback(
		(path: string) => {
			return () => navigate(path);
		},
		[navigate],
	);

	return (
		<StyledBottomBar>
			<Flex justify="center" align="center" height="100%">
				<Flex width="auto" gap="24">
					{Object.entries(pathObject).map(([path, SvgIcon]) => (
						<Button
							key={path}
							onClick={onClick(path)}
							theme={currentPagePath !== path ? 'primary' : 'outline'}
							invert={currentPagePath === path}
							circle
							width="50px"
							height="50px"
						>
							<Icon size="s" invert SvgIcon={SvgIcon} />
						</Button>
					))}
				</Flex>
			</Flex>
		</StyledBottomBar>
	);
});
