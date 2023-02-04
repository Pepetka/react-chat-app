import { Meta, StoryFn } from '@storybook/react';
import { Modal } from './Modal';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';
import { Card } from '@/shared/ui/Card';

export default {
	title: 'shared/Modal',
	component: Modal,
	decorators: [RouterDecorator()],
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	isOpen: true,
	children: (
		<Card>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ipsa iste
			maiores odit qui quidem recusandae reiciendis repellendus similique vel.
		</Card>
	),
};
