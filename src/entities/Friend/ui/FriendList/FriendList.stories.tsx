import { Meta, StoryFn } from '@storybook/react';
import { FriendList } from './FriendList';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'entities/Friend/FriendList',
	component: FriendList,
	decorators: [
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof FriendList>;

const Template: StoryFn<typeof FriendList> = (args) => <FriendList {...args} />;

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

export const UserFriends = Template.bind({});
UserFriends.args = {
	usersLists: {
		Followers: usersList,
		Following: usersList,
		Friends: usersList,
		Others: usersList,
	},
	profileId: '1',
	userId: '1',
};

export const NotUserFriends = Template.bind({});
NotUserFriends.args = {
	usersLists: {
		Followers: usersList,
		Following: usersList,
		Friends: usersList,
		Others: usersList,
	},
	profileId: '1',
	userId: '2',
};

export const Loading = Template.bind({});
Loading.args = {
	usersLists: {
		Followers: usersList,
		Following: usersList,
		Friends: usersList,
		Others: usersList,
	},
	profileId: '1',
	userId: '1',
	isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
	usersLists: {
		Followers: usersList,
		Following: usersList,
		Friends: usersList,
		Others: usersList,
	},
	profileId: '1',
	userId: '1',
	isError: true,
};
