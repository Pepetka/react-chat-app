import { Meta, StoryFn } from '@storybook/react';
import {
	RouterDecorator,
	PageDecorator,
	StoreDecorator,
} from '@/shared/config/storybook/decorators';
import { StateSchema } from '@/app/provider/Store';
import MainPage from './MainPage';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	decorators: [RouterDecorator(), PageDecorator()],
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = (args) => <MainPage />;

const state: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			id: 'userId',
		},
	},
};

export const Normal = Template.bind({});
Normal.args = {};

export const WithAuth = Template.bind({});
WithAuth.decorators = [StoreDecorator(state as StateSchema)];
