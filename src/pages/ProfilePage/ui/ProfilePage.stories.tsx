import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';
import { Social } from '@/features/SocialCard/model/types/socialCardSchema';
import { Post, PostStats } from '@/entities/Post/model/types/postSchema';
import ProfilePage from './ProfilePage';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = (args) => <ProfilePage />;

const user: Array<DeepPartial<User>> = [
	{
		id: '6cbdb793',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

const state: DeepPartial<StateSchema> = {
	user: {
		authData: user[0],
	},
};

const friends: Array<DeepPartial<User>> = [
	{
		id: '6cbdb794',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb795',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Oleg',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb796',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Pavel',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

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
Normal.args = {};
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb793&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = { relations: 'nobody' };

				return res(ctx.json(relations));
			},
		),
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			const social: Social = {
				followersNum: '101',
				followingNum: '202',
				groupsNum: '303',
			};

			return res(ctx.json(social));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(friends));
		}),
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
Error.args = {};
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb793&friendId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.status(403));
			},
		),
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}posts?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(
			`${__API__}postStats?postId=0&userId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.status(403));
			},
		),
	],
};
