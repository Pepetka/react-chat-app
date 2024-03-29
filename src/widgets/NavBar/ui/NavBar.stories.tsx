import { Meta, StoryFn } from '@storybook/react';
import { DeepPartial } from 'redux';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { NavBar } from './NavBar';

export default {
	title: 'widgets/NavBar',
	component: NavBar,
	decorators: [RouterDecorator()],
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
