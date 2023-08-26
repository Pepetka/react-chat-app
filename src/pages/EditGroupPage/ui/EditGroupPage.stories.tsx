import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Group } from '@/entities/Group';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import EditGroupPage from './EditGroupPage';

export default {
	title: 'pages/EditGroupPage',
	component: EditGroupPage,
	decorators: [RouterDecorator()],
} as Meta<typeof EditGroupPage>;

const Template: StoryFn<typeof EditGroupPage> = (args) => <EditGroupPage />;

const group: DeepPartial<Group> = {
	avatar: image,
	tags: ['tag1', 'tag2'],
	description: 'Some test description',
	name: 'Group name',
};

export const Normal = Template.bind({});
Normal.parameters = {
	msw: [
		rest.get(`${__API__}group`, (_req, res, ctx) => {
			return res(ctx.json(group));
		}),
	],
};

export const Loading = Template.bind({});
Loading.parameters = {
	msw: [
		rest.get(`${__API__}group`, (_req, res, ctx) => {
			return res(ctx.json(group), ctx.delay('infinite'));
		}),
	],
};

export const Error = Template.bind({});
Error.parameters = {
	msw: [
		rest.get(`${__API__}group`, (_req, res, ctx) => {
			return res(ctx.status(400));
		}),
	],
};
