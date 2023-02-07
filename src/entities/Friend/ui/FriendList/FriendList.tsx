import { memo, useEffect } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FriendCard } from '../FriendCard/FriendCard';
import { UserMini } from '@/shared/types/userCard';
import {
	useFetchFriendsQuery,
	useLazyFetchFriendsQuery,
} from '../../api/friendApi';

type BlockTitleType = 'Friends' | 'Following' | 'Followers' | 'Others';

interface IFriendListProps {
	userId: string;
	profileId: string;
}

interface IFriendListBlockProps {
	blockTitle: BlockTitleType;
	friendList?: Array<UserMini>;
	admin: boolean;
}

const StyledHr = styled.div`
	width: 200px;
	height: 2px;
	background: var(--invert-secondary-color);
`;

const btnText: Record<BlockTitleType, string> = {
	Followers: 'Add friend',
	Following: 'Unfollow',
	Friends: 'Unfriend',
	Others: 'Follow',
};

const FriendListBlock = memo((props: IFriendListBlockProps) => {
	const { friendList, blockTitle, admin } = props;
	const { t } = useTranslation('friends');

	if (!friendList || (!admin && blockTitle === 'Others')) {
		return null;
	}

	return (
		<Flex direction="column" gap="8">
			<Flex direction="column">
				<Text text={t(blockTitle)} theme="primary-invert" size="xl" />
				<StyledHr />
			</Flex>
			{friendList.map((friend) => (
				<Flex key={friend.id} direction="column">
					<FriendCard
						friend={friend}
						withBtn={admin}
						btnText={t(btnText[blockTitle])}
					/>
				</Flex>
			))}
		</Flex>
	);
});

export const FriendList = memo((props: IFriendListProps) => {
	const { userId, profileId } = props;
	const [fn, { data: usersLists, isLoading, error }] =
		useLazyFetchFriendsQuery();

	useEffect(() => {
		fn({ userId: profileId });
	}, [fn, profileId]);

	const groups: Array<BlockTitleType> = [
		'Friends',
		'Followers',
		'Following',
		'Others',
	];

	if (isLoading || !usersLists) {
		return null;
	}

	return (
		<Flex direction="column" gap="24">
			{groups.map((group) => (
				<FriendListBlock
					key={group}
					blockTitle={group}
					friendList={usersLists![group]}
					admin={userId === profileId}
				/>
			))}
		</Flex>
	);
});
