import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { Chat } from '@/entities/Chat';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { SearchChatsByName } from './SearchChatsByName';

export default {
	title: 'features/SearchChatsByName',
	component: SearchChatsByName,
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
} as Meta<typeof SearchChatsByName>;

const Template: StoryFn<typeof SearchChatsByName> = (args) => (
	<SearchChatsByName {...args} />
);

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
Normal.args = {
	userId: '1',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getChats`, (_req, res, ctx) => {
			return res(ctx.json(chatsList));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	userId: '1',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}getChats`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
