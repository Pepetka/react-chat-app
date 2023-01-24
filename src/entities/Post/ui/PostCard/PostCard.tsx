import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import LikeIcon from '@/shared/assets/like.svg';
import CommentIcon from '@/shared/assets/comment.svg';
import SpeakerIcon from '@/shared/assets/speaker.svg';
import MoreIcon from '@/shared/assets/more.svg';
import { User } from '@/entities/User';
import { Post } from '../../model/types/postSchema';
import { useTranslation } from 'react-i18next';
import { AppImg } from '@/shared/ui/AppImg';
import { Spinner } from '@/shared/ui/Spinner';

interface IPostCardProps {
	user: User;
	post: Post;
	onDeletePost?: (postId: string) => void;
}

const StyledMoreMenu = styled.div<{ openMore: boolean }>`
	display: ${(props) => (props.openMore ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	width: 140px;
	height: 64px;
	position: absolute;
	top: 0;
	left: -140px;
	background: var(--bg-color);
	border-radius: 5px;
	border: 2px solid var(--primary-color);
`;

export const PostCard = memo((props: IPostCardProps) => {
	const { user, post, onDeletePost } = props;
	const [openMore, setOpenMore] = useState(false);
	const { t } = useTranslation('profile');

	const onToggleMore = useCallback(() => {
		setOpenMore((prev) => !prev);
	}, []);

	const onDeletePostHandle = useCallback(() => {
		onDeletePost?.(post.id);
	}, [onDeletePost, post.id]);

	return (
		<Card width="100%">
			<Flex direction="column" gap="16">
				<Flex justify="space-between">
					<Flex align="center" gap="8" width="auto">
						<Avatar size="m" img={user.avatar} />
						<Text
							text={`${user.firstname} ${user.lastname}`}
							size="l"
							theme="primary-invert"
						/>
					</Flex>
					<Flex width="auto" height="auto">
						<Button
							onClick={onToggleMore}
							theme="clear"
							width="64px"
							height="64px"
						>
							<Icon SvgIcon={MoreIcon} invert />
						</Button>
						<StyledMoreMenu openMore={openMore}>
							<Button
								onClick={onDeletePostHandle}
								theme="clear"
								width="100%"
								height="100%"
							>
								{t('Delete')}
							</Button>
						</StyledMoreMenu>
					</Flex>
				</Flex>
				<Flex justify="space-between">
					<Text size="m" width="50%" text={post.text} theme="primary-invert" />
					<AppImg
						width="385px"
						height="385px"
						src={post.img}
						alt={t('Post image')}
						fallback={<Spinner />}
						errorFallback={
							<Text
								text={t('Something went wrong')}
								size="l"
								textAlign="center"
							/>
						}
					/>
				</Flex>
				<Flex align="flex-end" justify="space-between">
					<Text text={post.createdAt} theme="secondary-invert" />
					<Flex gap="24" align="center" width="auto">
						<Flex gap="8" align="center" width="auto">
							<Text
								width="auto"
								text="7"
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
							<Button invert width="64px" height="64px">
								<Icon SvgIcon={CommentIcon} />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Text
								width="auto"
								text="7"
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
							<Button invert width="64px" height="64px">
								<Icon SvgIcon={LikeIcon} />
							</Button>
						</Flex>
						<Flex gap="8" align="center" width="auto">
							<Text
								width="auto"
								text="7"
								textAlign="right"
								theme="primary-invert"
								size="l"
							/>
							<Button invert width="64px" height="64px">
								<Icon SvgIcon={SpeakerIcon} />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
