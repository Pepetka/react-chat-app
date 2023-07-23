import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import image from '@/shared/assets/images/image.jpg';
import { UserMini } from '@/shared/types/userCard';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { FriendList } from './FriendList';

export default {
	title: 'entities/Friend/FriendList',
	component: FriendList,
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
} as Meta<typeof FriendList>;

const Template: StoryFn<typeof FriendList> = (args) => <FriendList {...args} />;

const usersList: Array<UserMini> = [
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
