import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ProfileCard } from './ProfileCard';
import { User } from '@/entities/User';
import image from '@/shared/assets/images/image.jpg';
import { Relations } from '../model/types/profileCardSchema';

export default {
	title: 'features/ProfileCard',
	component: ProfileCard,
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

const user: Array<DeepPartial<User>> = [
	{
		id: '6cbdb793',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

export const UserProfile = Template.bind({});
UserProfile.args = {
	profileId: '6cbdb793',
	userId: '6cbdb793',
};
UserProfile.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb793&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = 'nobody';

				return res(ctx.json(relations));
			},
		),
	],
};

export const FriendProfile = Template.bind({});
FriendProfile.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
FriendProfile.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb794&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = 'friend';

				return res(ctx.json(relations));
			},
		),
	],
};

export const FollowerProfile = Template.bind({});
FollowerProfile.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
FollowerProfile.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb794&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = 'follower';

				return res(ctx.json(relations));
			},
		),
	],
};

export const FollowingProfile = Template.bind({});
FollowingProfile.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
FollowingProfile.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb794&friendId=6cbdb793`,
			(_req, res, ctx) => {
				const relations: Relations = 'following';

				return res(ctx.json(relations));
			},
		),
	],
};

export const Error = Template.bind({});
Error.args = {
	profileId: '6cbdb793',
	userId: '6cbdb794',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}users?id=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(
			`${__API__}relations?userId=6cbdb794&friendId=6cbdb793`,
			(_req, res, ctx) => {
				return res(ctx.status(403));
			},
		),
	],
};
