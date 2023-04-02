import { Meta, StoryFn } from '@storybook/react';
import { GroupDataCardSkeleton } from './GroupDataCardSkeleton';

export default {
	title: 'features/GroupDataCardSkeleton',
	component: GroupDataCardSkeleton,
} as Meta<typeof GroupDataCardSkeleton>;

const Template: StoryFn<typeof GroupDataCardSkeleton> = (args) => (
	<GroupDataCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
