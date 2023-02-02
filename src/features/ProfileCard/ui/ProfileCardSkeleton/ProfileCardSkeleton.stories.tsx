import { Meta, StoryFn } from '@storybook/react';
import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';

export default {
	title: 'features/ProfileCard/ProfileCardSkeleton',
	component: ProfileCardSkeleton,
	decorators: [RouterDecorator()],
} as Meta<typeof ProfileCardSkeleton>;

const Template: StoryFn<typeof ProfileCardSkeleton> = (args) => (
	<ProfileCardSkeleton {...args} />
);

export const WithBtns = Template.bind({});
WithBtns.args = {
	showBtns: true,
};

export const WithoutBtns = Template.bind({});
WithoutBtns.args = {
	showBtns: false,
};