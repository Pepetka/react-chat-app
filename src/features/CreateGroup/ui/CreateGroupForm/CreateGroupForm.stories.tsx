import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { CreateGroupForm } from './CreateGroupForm';

export default {
	title: 'features/CreateGroup/CreateGroupForm',
	component: CreateGroupForm,
	decorators: [RouterDecorator()],
} as Meta<typeof CreateGroupForm>;

const Template: StoryFn<typeof CreateGroupForm> = (args) => <CreateGroupForm />;

export const Normal = Template.bind({});
Normal.args = {};
