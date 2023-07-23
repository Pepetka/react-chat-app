import { Meta, StoryFn } from '@storybook/react';
import { UserMini } from '@/shared/types/userCard';
import { Comment } from '@/shared/types/comment';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { mockServerSocket } from '@/shared/config/storybook/mocks/socketMock/socketMock';
import {
	WithCallbackDecorator,
	RouterDecorator,
} from '@/shared/config/storybook/decorators';
import { PostComments } from './PostComments';

export default {
	title: 'features/PostListWithComments/PostComments',
	component: PostComments,
	decorators: [
		RouterDecorator(),
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
	name: 'Ivan Ivanov',
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
Normal.decorators = [
	WithCallbackDecorator(() => {
		mockServerSocket.on('comments', () => {
			mockServerSocket.emit('comments', {
				postId: '2',
				comments: comments('2'),
			});
		});
	}),
];

export const Error = Template.bind({});
Error.args = {
	commentsNum: 3,
	userId: '1',
	postId: '2',
};
Error.decorators = [
	WithCallbackDecorator(() => {
		mockServerSocket.on('comments', () => {
			mockServerSocket.emit(
				'comments',
				{
					postId: '2',
					comments: comments('2'),
				},
				true,
			);
		});
	}),
];
