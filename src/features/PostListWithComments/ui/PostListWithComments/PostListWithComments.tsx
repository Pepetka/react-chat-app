import { memo } from 'react';
import { PostList } from '@/entities/Post';
import { PostComments } from '../PostComments/PostComments';

interface IPostListWithCommentsProps {
	userId: string;
	profileId: string;
	admin: boolean;
}

const renderComments = ({
	userId,
	postId,
	commentsNum,
}: {
	userId: string;
	postId: string;
	commentsNum: number;
}) => (
	<PostComments userId={userId} postId={postId} commentsNum={commentsNum} />
);

export const PostListWithComments = memo(
	(props: IPostListWithCommentsProps) => {
		const { userId, profileId, admin } = props;

		return (
			<PostList
				userId={userId}
				profileId={profileId}
				commentList={renderComments}
				admin={admin}
			/>
		);
	},
);
