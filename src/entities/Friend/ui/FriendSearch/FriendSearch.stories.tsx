import { Meta, StoryFn } from '@storybook/react';
import { FriendSearch } from './FriendSearch';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'entities/FriendSearch',
	component: FriendSearch,
	decorators: [RouterDecorator()],
} as Meta<typeof FriendSearch>;

const Template: StoryFn<typeof FriendSearch> = (args) => (
	<FriendSearch {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
