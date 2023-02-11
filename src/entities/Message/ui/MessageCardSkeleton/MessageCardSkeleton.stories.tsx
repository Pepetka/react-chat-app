import { Meta, StoryFn } from '@storybook/react';
import { MessageCardSkeleton } from './MessageCardSkeleton';

export default {
	title: 'entities/Message/MessageCardSkeleton',
	component: MessageCardSkeleton,
} as Meta<typeof MessageCardSkeleton>;

const Template: StoryFn<typeof MessageCardSkeleton> = (args) => (
	<MessageCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
