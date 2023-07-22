import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { UserMini } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Social } from '../../model/types/socialDataSchema';
import { SocialCard } from './SocialCard';

export default {
	title: 'features/SocialCard/SocialCard',
	component: SocialCard,
	decorators: [RouterDecorator()],
} as Meta<typeof SocialCard>;

const Template: StoryFn<typeof SocialCard> = (args) => <SocialCard {...args} />;

const users: Array<UserMini> = [
	{
		id: '6cbdb794',
		avatar: image,
		name: 'Ivan Ivanov',
	},
	{
		id: '6cbdb795',
		avatar: image,
		name: 'Oleg Ivanov',
	},
	{
		id: '6cbdb796',
		avatar: image,
		name: 'Pavel Ivanov',
	},
];

export const Normal = Template.bind({});
Normal.args = {
	profileId: '6cbdb793',
	userId: '6cbdb793',
};
Normal.parameters = {
	msw: [
		rest.get(`${__API__}social`, (_req, res, ctx) => {
			const social: Social = {
				followersNum: '101',
				followingNum: '202',
				groupsNum: '303',
			};

			return res(ctx.json(social));
		}),
		rest.get(`${__API__}friends`, (_req, res, ctx) => {
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
		rest.get(`${__API__}social`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
		rest.get(`${__API__}friends`, (_req, res, ctx) => {
			return res(ctx.status(403));
		}),
	],
};
