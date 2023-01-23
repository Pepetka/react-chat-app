import { memo } from 'react';
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

interface IPostCardProps {
	user: User;
	post: Post;
}

export const PostCard = memo((props: IPostCardProps) => {
	const { user, post } = props;

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
					<Button theme="clear" width="64px" height="64px">
						<Icon SvgIcon={MoreIcon} invert />
					</Button>
				</Flex>
				<Flex justify="space-between">
					<Text size="m" width="50%" text={post.text} theme="primary-invert" />
					<img width="385px" height="385px" src={post.img} />
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
