import { DefaultBodyType, ResponseComposition, rest, RestContext } from 'msw';
import { User, UserMini } from '@/shared/types/userCard';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';
import { Group } from '@/entities/Group';
import { Chat } from '@/entities/Chat';
import { UsersLists } from '@/entities/Friend';
import { Social } from '@/entities/SocialData/model/types/socialDataSchema';
import { Post, PostStats } from '@/entities/Post';

const successResponse = <T extends object | string>(
	res: ResponseComposition<DefaultBodyType>,
	ctx: RestContext,
	data: T,
	delay = 0,
) => res(ctx.status(200), ctx.json(data), ctx.delay(delay));

const errorResponse = (
	res: ResponseComposition<DefaultBodyType>,
	ctx: RestContext,
	message: string,
	delay = 0,
) => res(ctx.status(400), ctx.json({ message }), ctx.delay(delay));

const auth = [
	rest.post(`${__API__}login`, async (req, res, ctx) => {
		const { password, username } = await req.json();
		const profileId = req.url.searchParams.get('profileId') ?? undefined;

		if (username === 'infinite') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (password === 'wrong password') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: DeepPartial<User> = {
			id: profileId,
		};

		return successResponse(res, ctx, data);
	}),
	rest.post(`${__API__}register`, async (req, res, ctx) => {
		const { password, username } = await req.json();
		const profileId = req.url.searchParams.get('profileId') ?? undefined;

		if (username === 'infinite') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (password === 'wrong password') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: DeepPartial<User> = {
			id: profileId,
		};

		return successResponse(res, ctx, data);
	}),
];

const profile = [
	rest.get(`${__API__}profile`, async (req, res, ctx) => {
		const profileId = req.url.searchParams.get('profileId') ?? undefined;

		if (profileId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (profileId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: DeepPartial<User> = {
			id: profileId,
			avatar: 'image',
			firstname: 'Name',
			lastname: 'Lastname',
			status: 'Some profile status',
			token: 'some token 123',
		};

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}relations`, async (req, res, ctx) => {
		const data: Relations = { relations: 'friend' };

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}getChatId`, async (req, res, ctx) => {
		const data = 'chatId';

		return successResponse(res, ctx, data);
	}),
];

const socialData = [
	rest.get(`${__API__}social`, async (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: Social = {
			groupsNum: '3',
			followersNum: '3',
			followingNum: '3',
		};

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}friends`, async (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: Array<UserMini> = new Array(3).fill(0).map((_, index) => ({
			id: `${index}`,
			avatar: 'image',
			name: 'Some name',
		}));

		return successResponse(res, ctx, data);
	}),
];

const group = [
	rest.get(`${__API__}group`, async (req, res, ctx) => {
		const groupId = req.url.searchParams.get('groupId') ?? undefined;

		if (groupId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (groupId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: DeepPartial<Group> = {
			id: groupId,
			avatar: 'image',
			name: 'Some group name',
			description: 'Some description',
		};

		return successResponse(res, ctx, data);
	}),
];

const searchBy = [
	rest.get(`${__API__}getChats`, (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, [], 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: Array<DeepPartial<Chat>> = new Array(3)
			.fill(0)
			.map((_, index) => ({
				id: `${index}`,
				user: {
					id: userId,
				},
				createdAt: '',
				lastMessage: '',
			}));

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}getUsers`, (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: UsersLists = {
			Friends: new Array(3).fill(0).map((_, index) => ({
				id: `${index}`,
				avatar: 'image',
				name: 'Some name',
			})),
		};

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}getGroups`, (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: Array<Group> = new Array(3).fill(0).map((_, index) => ({
			id: `${index}`,
			tags: ['it'],
			avatar: 'image',
			createdAt: '',
			description: '',
			name: 'Some name',
			ownerId: '',
		}));

		return successResponse(res, ctx, data);
	}),
];

const posts = [
	rest.get(`${__API__}posts`, (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: { posts: Array<Post>; endReached: boolean } = {
			endReached: true,
			posts: new Array(3).fill(0).map((_, index) => ({
				id: `${index}`,
				author: {
					id: userId ?? '',
					name: 'Some name',
					avatar: 'image',
				},
				img: [''],
				text: 'Some text',
				createdAt: '',
			})),
		};

		return successResponse(res, ctx, data);
	}),
	rest.get(`${__API__}postStats`, (req, res, ctx) => {
		const userId = req.url.searchParams.get('userId') ?? undefined;

		if (userId === 'loadingId') {
			return successResponse(res, ctx, {}, 1000);
		}

		if (userId === 'errorId') {
			return errorResponse(res, ctx, 'Some test error');
		}

		const data: PostStats = {
			shared: '3',
			comments: '3',
			dislikes: '3',
			likes: '3',
			isLiked: true,
			isDisliked: false,
			isShared: true,
		};

		return successResponse(res, ctx, data);
	}),
];

export const handlers = [
	...auth,
	...profile,
	...group,
	...searchBy,
	...socialData,
	...posts,
];
