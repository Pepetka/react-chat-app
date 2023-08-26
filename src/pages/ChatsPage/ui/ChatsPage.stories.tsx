import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StateSchema } from '@/app/provider/Store';
import {
	StoreDecorator,
	RouterDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import image from '@/shared/assets/images/image.jpg';
import { User } from '@/shared/types/userCard';
import { Chat } from '@/entities/Chat';
import ChatsPage from './ChatsPage';

export default {
	title: 'pages/ChatsPage',
	component: ChatsPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof ChatsPage>;

const Template: StoryFn<typeof ChatsPage> = (args) => <ChatsPage />;

const user: Array<DeepPartial<User>> = [
	{
		id: '1',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

const state: DeepPartial<StateSchema> = {
	user: {
		authData: user[1],
	},
};

const chatsList: Array<Chat> = [
	{
		id: '0',
		user: {
			avatar: image,
			name: 'Ivan Ivanov',
			id: 'id',
		},
		createdAt: '12:48 03.02.2023',
		lastMessage: 'Some last message',
	},
	{
		id: '1',
		user: {
			avatar: image,
			name: 'Ivan Ivanov',
			id: 'id1',
		},
		createdAt: '12:48 03.02.2023',
		lastMessage: 'Some last message',
	},
	{
		id: '2',
		user: {
			avatar: image,
			name: 'Ivan Ivanov',
			id: 'id2',
		},
		createdAt: '12:48 03.02.2023',
		lastMessage: 'Some last message',
	},
];

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getChats`, (_req, res, ctx) => {
			return res(ctx.json(chatsList));
		}),
	],
};

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator(state as StateSchema)];
Loading.parameters = {
	msw: [
		rest.get(`${__API__}getChats`, (_req, res, ctx) => {
			return res(ctx.json(chatsList), ctx.delay('infinite'));
		}),
	],
};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(`${__API__}getChats`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
