import { rest } from 'msw';
import { Meta, StoryFn } from '@storybook/react';
import image from '@/shared/assets/images/image.jpg';
import { User } from '@/shared/types/userCard';
import { Post, PostStats } from '@/entities/Post';
import { PostListWithComments } from './PostListWithComments';

export default {
	title: 'features/PostListWithComments/PostListWithComments',
	component: PostListWithComments,
} as Meta<typeof PostListWithComments>;

const Template: StoryFn<typeof PostListWithComments> = (args) => (
	<PostListWithComments {...args} />
);

const author: DeepPartial<User> = {
	id: '6cbdb793',
	firstname: 'Ivan',
	lastname: 'Ivanov',
	avatar: image,
};

const posts: Array<Post> = [
	{
		id: '0',
		author: author as User,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '1',
		author: author as User,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '2',
		author: author as User,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
];

const postStats: PostStats = {
	comments: '10',
	dislikes: '10',
	likes: '10',
	shared: '10',
	isDisliked: true,
	isLiked: true,
	isShared: true,
};

export const Normal = Template.bind({});
Normal.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}posts?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(posts));
		}),
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};

export const Error = Template.bind({});
Error.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}posts?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.json(postStats));
			},
		),
	],
};
