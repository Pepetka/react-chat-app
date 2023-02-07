import { Meta, StoryFn } from '@storybook/react';
import { CommentList } from './CommentList';
import { rest } from 'msw';
import { Comment } from '../../model/types/commentSchema';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'entities/comment/CommentList',
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

export const WithSettings = Template.bind({});
WithSettings.args = {
	userId: '6cbdb793',
	postId: '0',
};
WithSettings.parameters = {
	msw: [
		rest.get(`${__API__}comments?postId=0`, (_req, res, ctx) => {
			return res(ctx.json(comments('6cbdb793')));
		}),
	],
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	userId: '6cbdb793',
	postId: '0',
};
WithoutSettings.parameters = {
	msw: [
		rest.get(`${__API__}comments?postId=0`, (_req, res, ctx) => {
			return res(ctx.json(comments('6cbdb794')));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	userId: '6cbdb793',
	postId: '0',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}comments?postId=0`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
