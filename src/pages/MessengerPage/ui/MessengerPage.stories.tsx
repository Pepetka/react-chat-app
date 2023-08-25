import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StateSchema } from '@/app/provider/Store';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { Messages } from '@/entities/Message';
import { mockServerSocket } from '@/shared/config/socket/socketMock';
import {
	PageDecorator,
	RouterDecorator,
	StoreDecorator,
	WithCallbackDecorator,
} from '@/shared/config/storybook/decorators';
import MessengerPage from './MessengerPage';

export default {
	title: 'pages/MessengerPage',
	component: MessengerPage,
	decorators: [
		RouterDecorator('/chats/0?friendId=1', '/chats/:id'),
		PageDecorator(),
	],
} as Meta<typeof MessengerPage>;

const Template: StoryFn<typeof MessengerPage> = (args) => <MessengerPage />;

const state: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			id: '0',
		},
	},
};

const response: {
	messages: Messages;
	friend: UserMini;
	endReached: boolean;
	totalCount: number;
} = {
	friend: {
		id: '1',
		name: 'Ivan Ivanov',
		avatar: image,
	},
	messages: [
		[
			'30.01.2023',
			[
				{
					id: '0',
					authorId: '0',
					time: '13:11',
					name: 'Ivan Ivanov',
					text: 'Some message',
				},
			],
		],
		[
			'31.01.2023',
			[
				{
					id: '1',
					authorId: '1',
					time: '13:11',
					name: 'Vlad Kuznetsov',
					text: 'Some message',
				},
			],
		],
	],
	endReached: true,
	totalCount: 2,
};

export const Normal = Template.bind({});
Normal.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['0', '1']);
		});
	}),
];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}messages`, (_req, res, ctx) => {
			return res(ctx.json(response));
		}),
	],
};

export const Error = Template.bind({});
Error.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['0', '1']);
		});
	}),
];
Error.parameters = {
	msw: [
		rest.get(`${__API__}messages`, (_req, res, ctx) => {
			return res(ctx.status(400));
		}),
	],
};
