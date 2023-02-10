import { Meta, StoryFn } from '@storybook/react';
import { SearchFriendsByName } from './SearchFriendsByName';
import { Card } from '@/shared/ui/Card';
import { rest } from 'msw';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'features/SearchFriendsByName',
	component: SearchFriendsByName,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof SearchFriendsByName>;

const Template: StoryFn<typeof SearchFriendsByName> = (args) => (
	<SearchFriendsByName {...args} />
);

const usersList = [
	{
		avatar: image,
		firstname: 'Ivan',
		lastname: 'Ivanov',
		id: 'id',
	},
	{
		avatar: image,
		firstname: 'Ivan',
		lastname: 'Ivanov',
		id: 'id1',
	},
	{
		avatar: image,
		firstname: 'Ivan',
		lastname: 'Ivanov',
		id: 'id2',
	},
];

export const Normal = Template.bind({});
Normal.args = {
	profileId: '2',
	userId: '1',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}getUsers?userId=2&search=`, (_req, res, ctx) => {
			return res(
				ctx.json({
					Followers: usersList,
					Following: usersList,
					Friends: usersList,
					Others: usersList,
				}),
			);
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
		rest.get(`${__API__}getUsers?userId=2&search=`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
