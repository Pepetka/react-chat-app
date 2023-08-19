import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Group } from '@/entities/Group';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { EditGroupForm } from './EditGroupForm';

export default {
	title: 'features/EditGroup/EditGroupForm',
	component: EditGroupForm,
	decorators: [RouterDecorator()],
} as Meta<typeof EditGroupForm>;

const Template: StoryFn<typeof EditGroupForm> = (args) => <EditGroupForm />;

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

export const Error = Template.bind({});
Error.parameters = {
	msw: [
		rest.get(`${__API__}group`, (_req, res, ctx) => {
			return res(ctx.status(400));
		}),
	],
};
