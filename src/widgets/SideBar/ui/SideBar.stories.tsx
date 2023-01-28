import { Meta, StoryFn } from '@storybook/react';
import { SideBar } from './SideBar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { DeepPartial } from 'redux';
import { StateSchema } from '@/app/provider/Store';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'widgets/SideBar',
	component: SideBar,
	decorators: [RouterDecorator()],
} as Meta<typeof SideBar>;

const Template: StoryFn<typeof SideBar> = (args) => <SideBar />;

const state: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			id: 'id',
			username: '',
			lastname: '',
			firstname: '',
			email: '',
			age: 0,
			avatar: '',
			createdAt: '',
		},
	},
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
