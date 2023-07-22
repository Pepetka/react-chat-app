import { Meta, StoryFn } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { SideBar } from './SideBar';

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
