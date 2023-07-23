import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { SearchFriendsByName } from './SearchFriendsByName';

export default {
	title: 'features/SearchFriendsByName',
	component: SearchFriendsByName,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100%',
						height: '100%',
					}}
				>
					<Card width="100%">
						<StoryComponent />
					</Card>
				</div>
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
		name: 'Ivan Ivanov',
		id: 'id',
	},
	{
		avatar: image,
		name: 'Ivan Ivanov',
		id: 'id1',
	},
	{
		avatar: image,
		name: 'Ivan Ivanov',
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
		rest.get(`${__API__}getUsers`, (_req, res, ctx) => {
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
		rest.get(`${__API__}getUsers`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
