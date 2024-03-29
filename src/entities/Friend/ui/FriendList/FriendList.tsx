import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { UserMini } from '@/shared/types/userCard';
import { FriendCard } from '../FriendCard/FriendCard';
import { UsersLists } from '../../model/types/friendSchema';
import { FriendCardSkeleton } from '../FriendCardSkeleton/FriendCardSkeleton';

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
	'data-testid'?: string;
}

interface IFriendListBlockProps {
	blockTitle: BlockTitleType;
	friendList?: Array<UserMini>;
	admin: boolean;
	onAddFriend?: (friendId: string) => void;
	'data-testid'?: string;
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
	const {
		friendList,
		blockTitle,
		admin,
		onAddFriend,
		'data-testid': dataTestId,
	} = props;
	const { t } = useTranslation('friends');

	if (!friendList || (!admin && blockTitle === 'Others')) {
		return null;
	}

	return (
		<Flex
			data-testid={`${dataTestId}.group.${blockTitle}`}
			direction="column"
			gap="8"
		>
			<Flex direction="column">
				<Text text={t(blockTitle)} theme="primary-invert" size="xl" />
				<StyledHr />
			</Flex>
			{friendList.map((friend) => (
				<Flex key={friend.id} direction="column">
					<FriendCard
						data-testid={`${dataTestId}.card.${friend.id}`}
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
	const {
		userId,
		profileId,
		isError,
		isLoading,
		usersLists,
		onAddFriend,
		'data-testid': dataTestId,
	} = props;
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
			<Flex
				data-testid={`${dataTestId}.error`}
				direction="column"
				gap="24"
				justify="center"
				align="center"
			>
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
			<Flex data-testid={`${dataTestId}.skeleton`} direction="column" gap="24">
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
					data-testid={dataTestId}
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
