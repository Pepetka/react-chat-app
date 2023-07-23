import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators';
import { PostCardSkeleton } from './PostCardSkeleton';

export default {
	title: 'entities/Post/PostCardSkeleton',
	component: PostCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof PostCardSkeleton>;

const Template: StoryFn<typeof PostCardSkeleton> = (args) => (
	<PostCardSkeleton {...args} />
);

export const WithSettings = Template.bind({});
WithSettings.args = {
	admin: true,
};

export const WithoutSettings = Template.bind({});
WithoutSettings.args = {
	admin: false,
};
