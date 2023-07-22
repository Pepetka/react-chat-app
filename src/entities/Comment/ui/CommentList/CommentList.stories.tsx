import { Meta, StoryFn } from '@storybook/react';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { Comment } from '@/shared/types/comment';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { CommentList } from './CommentList';

export default {
	title: 'entities/Comment/CommentList',
	component: CommentList,
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
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args) => (
	<CommentList {...args} />
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

export const WithSettings = Template.bind({});
WithSettings.args = {
	userId: '6cbdb793',
	postId: '0',
	comments: comments('6cbdb793'),
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	userId: '6cbdb793',
	postId: '0',
	comments: comments('6cbdb794'),
};

export const Error = Template.bind({});
Error.args = {
	userId: '6cbdb793',
	postId: '0',
	comments: comments('6cbdb793'),
	isError: true,
};

export const Loading = Template.bind({});
Loading.args = {
	userId: '6cbdb793',
	postId: '0',
	comments: comments('6cbdb793'),
	isLoading: true,
};
