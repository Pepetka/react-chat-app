import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StateSchema } from '@/app/provider/Store';
import {
	StoreDecorator,
	RouterDecorator,
	WithCallbackDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import { User, UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Social } from '@/entities/SocialData/model/types/socialDataSchema';
import { Post, PostStats } from '@/entities/Post/model/types/postSchema';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';
import { mockServerSocket } from '@/shared/config/socket/socketMock';
import ProfilePage from './ProfilePage';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	decorators: [
		RouterDecorator('/profile/6cbdb793', '/profile/:id'),
		PageDecorator(),
	],
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = (args) => <ProfilePage />;

const user: DeepPartial<User> = {
	id: '6cbdb793',
	avatar: image,
	lastname: 'Ivanov',
	firstname: 'Ivan',
	username: 'user',
	status: 'Some status first line,\nSome status second line',
};

const state: DeepPartial<StateSchema> = {
	user: {
		authData: user,
	},
};

const friends: Array<UserMini> = [
	{
		id: '6cbdb794',
		avatar: image,
		name: 'Ivan Ivanov',
	},
	{
		id: '6cbdb795',
		avatar: image,
		name: 'Oleg Ivanov',
	},
	{
		id: '6cbdb796',
		avatar: image,
		name: 'Pavel Ivanov',
	},
];

const author: UserMini = {
	id: '6cbdb793',
	name: 'Ivan Ivanov',
	avatar: image,
};

const posts: Array<Post> = [
	{
		id: '0',
		author,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '1',
		author,
		img: [image, image, image],
		createdAt: '14:24 24.01.2023',
		text: 'Some post text first line,\nsome post text second line,\nsome post text third line',
	},
	{
		id: '2',
		author,
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
Normal.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['6cbdb793']);
		});
	}),
];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(`${__API__}relations`, (_req, res, ctx) => {
			const relations: Relations = { relations: 'nobody' };

			return res(ctx.json(relations));
		}),
		rest.get(`${__API__}social`, (_req, res, ctx) => {
			const social: Social = {
				followersNum: '101',
				followingNum: '202',
				groupsNum: '303',
			};

			return res(ctx.json(social));
		}),
		rest.get(`${__API__}friends`, (_req, res, ctx) => {
			return res(ctx.json(friends));
		}),
		rest.get(`${__API__}posts`, (_req, res, ctx) => {
			return res(ctx.json({ posts, endReached: true }));
		}),
		rest.get(`${__API__}postStats`, (_req, res, ctx) => {
			return res(ctx.json(postStats));
		}),
		rest.get(`${__API__}getChatId`, (_req, res, ctx) => {
			return res(ctx.json(''));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['6cbdb793'], true);
		});
	}),
];
Error.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}relations`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}social`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}friends`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}posts`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}postStats`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}getChatId`, (_req, res, ctx) => {
			return res(ctx.json(''));
		}),
	],
};
