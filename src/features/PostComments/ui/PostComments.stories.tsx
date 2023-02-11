import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Comment } from '@/entities/Comment';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { PostComments } from './PostComments';

export default {
	title: 'features/PostComments',
	component: PostComments,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof PostComments>;

const Template: StoryFn<typeof PostComments> = (args) => (
	<PostComments {...args} />
);

const author: UserMini = {
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
	id: '',
};

const comments = (authorId: string): Array<Comment> => [
	{
		postId: '0',
		text: 'Some comment text 1',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId },
		id: '0',
	},
	{
		postId: '0',
		text: 'Some comment text 2',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId },
		id: '1',
	},
	{
		postId: '0',
		text: 'Some comment text 3',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId },
		id: '2',
	},
];

export const Normal = Template.bind({});
Normal.args = {
	commentsNum: 3,
	userId: '1',
	postId: '2',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}comments?postId=2`, (_req, res, ctx) => {
			return res(ctx.json(comments('1')));
		}),
	],
};
