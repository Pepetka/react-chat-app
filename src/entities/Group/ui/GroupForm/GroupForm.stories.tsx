import { Meta, StoryFn } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { GroupForm } from './GroupForm';

export default {
	title: 'entities/Group/GroupForm',
	component: GroupForm,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<Card width="100%">
					<StoryComponent />
				</Card>
			);
		},
	],
} as Meta<typeof GroupForm>;

const Template: StoryFn<typeof GroupForm> = (args) => <GroupForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
