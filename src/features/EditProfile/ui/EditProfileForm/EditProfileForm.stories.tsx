import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { User } from '@/shared/types/userCard';
import image from '@/shared/assets/images/image.jpg';
import { EditProfileForm } from './EditProfileForm';

export default {
	title: 'features/EditProfile/EditProfileForm',
	component: EditProfileForm,
	decorators: [RouterDecorator()],
} as Meta<typeof EditProfileForm>;

const Template: StoryFn<typeof EditProfileForm> = (args) => <EditProfileForm />;

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

export const Error = Template.bind({});
Error.parameters = {
	msw: [
		rest.get(`${__API__}profile`, (_req, res, ctx) => {
			return res(ctx.status(400));
		}),
	],
};
