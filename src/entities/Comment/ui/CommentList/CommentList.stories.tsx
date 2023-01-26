import { Meta, StoryFn } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
	title: 'components/CommentList',
	component: CommentList,
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args) => (
	<CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
