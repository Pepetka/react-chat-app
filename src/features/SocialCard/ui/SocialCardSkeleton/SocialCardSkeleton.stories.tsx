import { Meta, StoryFn } from '@storybook/react';
import { SocialCardSkeleton } from './SocialCardSkeleton';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'features/SocialCard/SocialCardSkeleton',
	component: SocialCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof SocialCardSkeleton>;

const Template: StoryFn<typeof SocialCardSkeleton> = (args) => (
	<SocialCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
