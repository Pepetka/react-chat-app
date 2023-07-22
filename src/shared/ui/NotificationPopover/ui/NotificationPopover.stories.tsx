import { Meta, StoryFn } from '@storybook/react';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { NotificationPopover } from './NotificationPopover';

export default {
	title: 'shared/NotificationPopover',
	component: NotificationPopover,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<Flex height="300px" justify="center" align="center">
					<StoryComponent />
				</Flex>
			);
		},
	],
} as Meta<typeof NotificationPopover>;

const Template: StoryFn<typeof NotificationPopover> = (args) => (
	<NotificationPopover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	children: <Button>Click</Button>,
	notification: '1',
};

export const Big = Template.bind({});
Big.args = {
	children: <Button>Click</Button>,
	notification: '1000',
};
