import { Meta, StoryFn } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { GroupDataCardSkeleton } from './GroupDataCardSkeleton';

export default {
	title: 'features/GroupDataCard/GroupDataCardSkeleton',
	component: GroupDataCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof GroupDataCardSkeleton>;

const Template: StoryFn<typeof GroupDataCardSkeleton> = (args) => (
	<GroupDataCardSkeleton />
);

export const Normal = Template.bind({});
Normal.args = {};
