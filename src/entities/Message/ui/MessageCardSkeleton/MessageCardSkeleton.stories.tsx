import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { MessageCardSkeleton } from './MessageCardSkeleton';

export default {
	title: 'entities/Message/MessageCardSkeleton',
	component: MessageCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof MessageCardSkeleton>;

const Template: StoryFn<typeof MessageCardSkeleton> = () => (
	<MessageCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
