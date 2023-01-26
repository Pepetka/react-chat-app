import { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
	title: 'components/CommentCard',
	component: CommentCard,
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
