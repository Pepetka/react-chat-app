import { Meta, StoryFn } from '@storybook/react';
import { PostCard } from './PostCard';
import { Post, PostStats } from '../../model/types/postSchema';
import { User } from '@/entities/User';
import image from '@/shared/assets/images/image.jpg';
import { rest } from 'msw';
import { Comment } from '@/entities/Comment/model/types/commentSchema';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'entities/Post/PostCard',
	component: PostCard,
	decorators: [RouterDecorator()],
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

const author: DeepPartial<User> = {
	id: '6cbdb793',
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
};

const post: Post = {
	id: '0',
	author: author as User,
	img: image,
	createdAt: '14:24 24.01.2023',
	text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
};

const postStats: PostStats = {
	comments: '10',
	dislikes: '10',
	likes: '10',
	shared: '10',
	isDisliked: true,
	isLiked: true,
	isShared: true,
};

const comments = (authorId: string): Array<Comment> => [
	{
		postId: '0',
		text: 'Some comment text 1',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId } as User,
		id: '0',
	},
	{
		postId: '0',
		text: 'Some comment text 2',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId } as User,
		id: '1',
	},
	{
		postId: '0',
		text: 'Some comment text 3',
		createdAt: '14:24 24.01.2023',
		author: { ...author, id: authorId } as User,
		id: '2',
	},
];

export const WithSettings = Template.bind({});
WithSettings.args = {
	post,
	userId: '6cbdb793',
	admin: true,
};
WithSettings.parameters = {
	msw: [
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	post,
	userId: '6cbdb793',
};
WithoutSettings.parameters = {
	msw: [
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};

export const OpenComments = Template.bind({});
OpenComments.args = {
	post,
	userId: '6cbdb793',
	admin: true,
	openCommentsDefault: true,
};
OpenComments.parameters = {
	msw: [
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
		rest.get(`${__API__}comments?postId=0`, (_req, res, ctx) => {
			return res(ctx.json(comments('6cbdb793')));
		}),
	],
};