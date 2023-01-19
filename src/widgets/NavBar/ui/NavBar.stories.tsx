import { Meta, StoryFn } from '@storybook/react';
import { NavBar } from './NavBar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { DeepPartial } from 'redux';

export default {
	title: 'widgets/NavBar',
	component: NavBar,
} as Meta<typeof NavBar>;

const Template: StoryFn<typeof NavBar> = (args) => <NavBar {...args} />;

const state: DeepPartial<StateSchema> = {
	user: {
		authData: {
			id: 'id',
			createdAt: '',
			avatar: '',
			age: 0,
			email: '',
			firstname: '',
			lastname: '',
			username: '',
		},
		_inited: true,
	},
};

export const WithAuth = Template.bind({});
WithAuth.args = {
	currentPagePath: '/login',
};
WithAuth.decorators = [StoreDecorator(state as StateSchema)];

export const WithoutAuth = Template.bind({});
WithoutAuth.args = {
	currentPagePath: '/login',
};
WithoutAuth.decorators = [
	StoreDecorator({ user: { _inited: true } } as StateSchema),
];
