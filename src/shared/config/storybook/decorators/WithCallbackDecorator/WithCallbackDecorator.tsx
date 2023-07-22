import { Decorator } from '@storybook/react';

export const WithCallbackDecorator =
	(callback: () => void): Decorator =>
	(StoryComponent) => {
		callback();

		return <StoryComponent />;
	};
