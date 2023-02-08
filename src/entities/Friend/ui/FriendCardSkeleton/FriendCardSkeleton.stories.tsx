import { Meta, StoryFn } from '@storybook/react';
import { FriendCardSkeleton } from './FriendCardSkeleton';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'components/FriendCardSkeleton',
	component: FriendCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof FriendCardSkeleton>;

const Template: StoryFn<typeof FriendCardSkeleton> = (args) => (
	<FriendCardSkeleton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
