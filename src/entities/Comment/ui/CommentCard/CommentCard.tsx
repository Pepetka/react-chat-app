import { memo, useCallback } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { getProfilePagePath } from '@/shared/const/router';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import MoreIcon from '@/shared/assets/more.svg';
import { useTranslation } from 'react-i18next';
import { Menu } from '@/shared/ui/Menu';
import { Comment } from '../../model/types/commentSchema';
import { UserCard } from '@/shared/ui/UserCard';

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
				<UserCard user={comment.author} avatarSize="s" textSize="m" />
				{admin && (
					<Menu
						direction="bottom_center"
						width="48px"
						height="48px"
						trigger={<Icon SvgIcon={MoreIcon} invert />}
					>
						<Button
							onClick={onDeleteCommentHandle}
							theme="clear"
							width="120px"
							height="48px"
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
