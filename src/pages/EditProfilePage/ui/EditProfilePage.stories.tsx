import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import EditProfilePage from './EditProfilePage';

export default {
	title: 'pages/EditProfilePage',
	component: EditProfilePage,
	decorators: [RouterDecorator()],
} as Meta<typeof EditProfilePage>;

const Template: StoryFn<typeof EditProfilePage> = (args) => <EditProfilePage />;

const profile: DeepPartial<User> = {
	avatar: image,
	age: 23,
	firstname: 'User',
	lastname: 'User',
	email: 'test@mail.ru',
	status: 'Test status',
};

export const Normal = Template.bind({});
Normal.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.json(profile));
		}),
	],
};

export const Loading = Template.bind({});
Loading.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.json(profile), ctx.delay('infinite'));
		}),
	],
};

export const Error = Template.bind({});
Error.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.status(400));
		}),
	],
};
