import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { Group } from '@/entities/Group';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { SearchGroupsByName } from './SearchGroupsByName';

export default {
	title: 'features/SearchGroupsByName',
	component: SearchGroupsByName,
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
} as Meta<typeof SearchGroupsByName>;

const Template: StoryFn<typeof SearchGroupsByName> = (args) => (
	<SearchGroupsByName {...args} />
);

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
Normal.args = {
	profileId: '2',
	userId: '1',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getGroups`, (_req, res, ctx) => {
			return res(ctx.json(groupsList));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	profileId: '2',
	userId: '1',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}getGroups`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
