import { Meta, StoryFn } from '@storybook/react';
import { SocialCard } from './SocialCard';
import { rest } from 'msw';
import { Social } from '../../model/types/socialCardSchema';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';

export default {
	title: 'features/SocialCard/SocialCard',
	component: SocialCard,
} as Meta<typeof SocialCard>;

const Template: StoryFn<typeof SocialCard> = (args) => <SocialCard {...args} />;

const users: Array<DeepPartial<User>> = [
	{
		id: '6cbdb794',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Ivan',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb795',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Oleg',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
	{
		id: '6cbdb796',
		avatar: image,
		lastname: 'Ivanov',
		firstname: 'Pavel',
		username: 'user',
		status: 'Some status first line,\nSome status second line',
	},
];

export const Normal = Template.bind({});
Normal.args = {
	profileId: '6cbdb793',
	userId: '6cbdb793',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			const social: Social = {
				followersNum: '101',
				followingNum: '202',
				groupsNum: '303',
			};

			return res(ctx.json(social));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.json(users));
		}),
	],
};

export const Error = Template.bind({});
Error.args = {
	profileId: '6cbdb793',
	userId: '6cbdb793',
};
Error.parameters = {
	msw: [
		rest.get(`${__API__}social?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}friends?userId=6cbdb793`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
