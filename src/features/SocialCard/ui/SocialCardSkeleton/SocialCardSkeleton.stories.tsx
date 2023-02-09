import { Meta, StoryFn } from '@storybook/react';
import { SocialCardSkeleton } from './SocialCardSkeleton';

export default {
	title: 'features/SocialCard/SocialCardSkeleton',
	component: SocialCardSkeleton,
} as Meta<typeof SocialCardSkeleton>;

const Template: StoryFn<typeof SocialCardSkeleton> = (args) => (
	<SocialCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
