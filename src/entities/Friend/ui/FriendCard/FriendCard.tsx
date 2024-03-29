import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { UserCard } from '@/shared/ui/UserCard';
import { Button } from '@/shared/ui/Button';
import { useHover } from '@/shared/hooks/useHover';
import { Text } from '@/shared/ui/Text';
import { UserMini } from '@/shared/types/userCard';

interface IFriendProps {
	friend: UserMini;
	btnText: string;
	withBtn?: boolean;
	initialHover?: boolean;
	onAddFriend?: (friendId: string) => void;
	'data-testid'?: string;
}

const StyledHr = styled.div<{ hover: boolean }>`
	width: ${(props) => (props.hover ? '100%' : '0%')};
	height: 2px;
	background: var(--invert-secondary-color);
	transition: width 0.3s ease-in-out;
`;

export const FriendCard = memo((props: IFriendProps) => {
	const {
		friend,
		btnText,
		withBtn = true,
		onAddFriend,
		initialHover = false,
		'data-testid': dataTestId,
	} = props;
	const { hover, onMouseOut, onMouseOver } = useHover({
		initialHover,
	});

	const onAddFriendHandle = useCallback(() => {
		onAddFriend?.(friend.id);
	}, [friend.id, onAddFriend]);

	return (
		<Flex data-testid={dataTestId} direction="column" gap="4">
			<Flex
				justify="space-between"
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
			>
				<UserCard
					id={friend.id}
					name={friend.name}
					avatar={friend.avatar}
					avatarSize="s"
				/>
				{hover && withBtn && (
					<Button
						aria-label="Add friend"
						onClick={onAddFriendHandle}
						theme="outline"
						invert
						width="140px"
					>
						<Text text={btnText} theme="primary-invert" textAlign="center" />
					</Button>
				)}
			</Flex>
			<StyledHr hover={hover} />
		</Flex>
	);
});
