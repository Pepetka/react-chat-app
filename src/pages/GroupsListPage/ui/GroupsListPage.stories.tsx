import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { StateSchema } from '@/app/provider/Store';
import {
	StoreDecorator,
	RouterDecorator,
	PageDecorator,
} from '@/shared/config/storybook/decorators';
import { Group } from '@/entities/Group';
import GroupsListPage from './GroupsListPage';

export default {
	title: 'pages/GroupsListPage',
	component: GroupsListPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof GroupsListPage>;

const Template: StoryFn<typeof GroupsListPage> = (args) => <GroupsListPage />;

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

const groupsList: Array<Group> = [
	{
		avatar: image,
		name: 'Some group',
		id: 'id',
		description: 'Some description',
		createdAt: '03.02.2023',
		tags: [],
		ownerId: '1',
	},
	{
		avatar: image,
		name: 'Some group',
		id: 'id1',
		description: 'Some description',
		createdAt: '03.02.2023',
		tags: [],
		ownerId: '1',
	},
	{
		avatar: image,
		name: 'Some group',
		id: 'id2',
		description: 'Some description',
		createdAt: '03.02.2023',
		tags: [],
		ownerId: '1',
	},
];

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getGroups`, (_req, res, ctx) => {
			return res(ctx.json(groupsList));
		}),
	],
};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator(state as StateSchema)];
Error.parameters = {
	msw: [
		rest.get(`${__API__}getGroups`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
