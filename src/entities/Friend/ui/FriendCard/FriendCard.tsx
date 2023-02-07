import { Flex } from '@/shared/ui/Flex';
import { memo } from 'react';
import { UserCard } from '@/shared/ui/UserCard';
import { UserMini } from '@/shared/types/userCard';
import { Button } from '@/shared/ui/Button';
import { useHover } from '@/shared/hooks/useHover';
import styled from 'styled-components';
import { Text } from '@/shared/ui/Text';

interface IFriendProps {
	friend: UserMini;
	btnText: string;
	withBtn?: boolean;
}

const StyledHr = styled.div<{ hover: boolean }>`
	width: ${(props) => (props.hover ? '100%' : '0%')};
	height: 2px;
	background: var(--invert-secondary-color);
	transition: width 0.3s ease-in-out;
`;

export const FriendCard = memo((props: IFriendProps) => {
	const { friend, btnText, withBtn = true } = props;
	const { hover, onMouseOut, onMouseOver } = useHover();

	return (
		<Flex direction="column" gap="4">
			<Flex
				justify="space-between"
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
			>
				<UserCard user={friend} avatarSize="s" />
				{hover && withBtn && (
					<Button theme="outline" invert width="140px">
						<Text text={btnText} theme="primary-invert" textAlign="center" />
					</Button>
				)}
			</Flex>
			<StyledHr hover={hover} />
		</Flex>
	);
});
