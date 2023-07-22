import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { SocialCardSkeleton } from './SocialCardSkeleton';

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
