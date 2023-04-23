import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Group } from '@/entities/Group';
import image from '@/shared/assets/images/image.jpg';
import { GroupDataCard } from './GroupDataCard';

export default {
	title: 'features/GroupDataCard/GroupDataCard',
	component: GroupDataCard,
} as Meta<typeof GroupDataCard>;

const Template: StoryFn<typeof GroupDataCard> = (args) => (
	<GroupDataCard {...args} />
);

const group: Array<Group> = [
	{
		id: '0',
		description: 'Some description',
		avatar: image,
		createdAt: '',
		name: 'GroupName',
		ownerId: '1',
		tags: ['IT'],
	},
];

export const Normal = Template.bind({});
Normal.args = {
	groupId: '0',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}groups?id=0`, (_req, res, ctx) => {
			return res(ctx.json(group));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	groupId: '0',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}groups?id=0`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
