import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Menu } from '@/shared/ui/Menu';
import { UserCard } from '@/shared/ui/UserCard';
import MoreIcon from '@/shared/assets/more.svg';
import { Comment } from '@/shared/types/comment';

interface ICommentCardProps {
	comment: Comment;
	admin?: boolean;
	deleteLoading?: boolean;
	onDeleteComment?: (commentId: string) => void;
}

export const CommentCard = memo((props: ICommentCardProps) => {
	const { comment, admin, deleteLoading, onDeleteComment } = props;
	const { t } = useTranslation('profile');

	const onDeleteCommentHandle = useCallback(() => {
		onDeleteComment?.(comment.id);
	}, [comment.id, onDeleteComment]);

	return (
		<Flex direction="column" gap="8">
			<Flex justify="space-between">
				<UserCard
					id={comment.author.id}
					name={comment.author.name}
					avatar={comment.author.avatar}
					avatarSize="s"
					textSize="m"
				/>
				{admin && (
					<Menu
						direction="bottom_left"
						width="48px"
						height="48px"
						trigger={<Icon SvgIcon={MoreIcon} invert />}
					>
						<Button
							onClick={onDeleteCommentHandle}
							theme="clear"
							width="100px"
							height="28px"
						>
							{deleteLoading ? '...' : t('Delete')}
						</Button>
					</Menu>
				)}
			</Flex>
			<Text text={comment.text} theme="primary-invert" width="90%" />
			<Text text={comment.createdAt} theme="secondary-invert" />
		</Flex>
	);
});
