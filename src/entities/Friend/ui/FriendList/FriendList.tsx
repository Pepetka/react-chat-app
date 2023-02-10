import { memo, useCallback, useEffect } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FriendCard } from '../FriendCard/FriendCard';
import { UserMini } from '@/shared/types/userCard';
import { useSearchParams } from 'react-router-dom';
import { FriendCardSkeleton } from '../FriendCardSkeleton/FriendCardSkeleton';
import { UsersLists } from '@/entities/Friend';

type BlockTitleType = 'Friends' | 'Following' | 'Followers' | 'Others';

interface IFriendListProps {
	userId: string;
	profileId: string;
	usersLists?: UsersLists;
	isLoading: boolean;
	isError: boolean;
	onAddFriend?: ({
		userId,
		friendId,
		search,
	}: {
		userId: string;
		friendId: string;
		search: string;
	}) => void;
}

interface IFriendListBlockProps {
	blockTitle: BlockTitleType;
	friendList?: Array<UserMini>;
	admin: boolean;
	onAddFriend?: (friendId: string) => void;
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
	const { friendList, blockTitle, admin, onAddFriend } = props;
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
						onAddFriend={onAddFriend}
					/>
				</Flex>
			))}
		</Flex>
	);
});

export const FriendList = memo((props: IFriendListProps) => {
	const { userId, profileId, isError, isLoading, usersLists, onAddFriend } =
		props;
	const { t } = useTranslation('friends');
	const [searchParams] = useSearchParams();

	const onAddFriendHandle = useCallback(
		(friendId: string) => {
			onAddFriend?.({
				userId,
				friendId,
				search: searchParams.get('search') ?? '',
			});
		},
		[onAddFriend, searchParams, userId],
	);

	const groups: Array<BlockTitleType> = [
		'Friends',
		'Followers',
		'Following',
		'Others',
	];

	if (isError && !isLoading) {
		return (
			<Flex direction="column" gap="24" justify="center" align="center">
				<Text
					text={t('Something went wrong')}
					theme="error"
					textAlign="center"
					size="l"
				/>
			</Flex>
		);
	}

	if (isLoading || !usersLists) {
		return (
			<Flex direction="column" gap="24">
				{groups.map((group) => {
					if (userId !== profileId && group === 'Others') {
						return null;
					}

					return (
						<Flex key={group} direction="column" gap="8">
							<Flex direction="column">
								<Text text={t(group)} theme="primary-invert" size="xl" />
								<StyledHr />
							</Flex>
							<FriendCardSkeleton />
							<FriendCardSkeleton />
							<FriendCardSkeleton />
						</Flex>
					);
				})}
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="24">
			{groups.map((group) => (
				<FriendListBlock
					key={group}
					blockTitle={group}
					friendList={usersLists[group]}
					admin={userId === profileId}
					onAddFriend={onAddFriendHandle}
				/>
			))}
		</Flex>
	);
});
