import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { StateSchema } from '@/app/provider/Store';
import { Messages } from '@/entities/Message';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import {
	RouterDecorator,
	StoreDecorator,
	WithCallbackDecorator,
} from '@/shared/config/storybook/decorators';
import { mockServerSocket } from '@/shared/config/socket/socketMock';
import { Flex } from '@/shared/ui/Flex';
import { Messenger } from './Messenger';

export default {
	title: 'features/Messenger',
	component: Messenger,
	decorators: [
		RouterDecorator(),
		(StoriesComponent) => (
			<Flex height="100vh" width="80%">
				<StoriesComponent />
			</Flex>
		),
	],
} as Meta<typeof Messenger>;

const Template: StoryFn<typeof Messenger> = (args) => <Messenger {...args} />;

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
Normal.args = {
	chatId: 'id',
	friendId: '1',
	userId: '0',
};
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

export const Loading = Template.bind({});
Loading.args = {
	chatId: 'id',
	friendId: '1',
	userId: '0',
};
Loading.decorators = [
	StoreDecorator(state as StateSchema),
	WithCallbackDecorator(() => {
		mockServerSocket.on('online', () => {
			mockServerSocket.emit('online', ['0', '1']);
		});
	}),
];
Loading.parameters = {
	msw: [
		rest.get(`${__API__}messages`, (_req, res, ctx) => {
			return res(ctx.json(response), ctx.delay('infinite'));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	chatId: 'id',
	friendId: '1',
	userId: '0',
};
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
