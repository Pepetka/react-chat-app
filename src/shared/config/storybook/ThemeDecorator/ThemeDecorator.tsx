import { Decorator } from '@storybook/react';
import '@/app/styles/index.css';

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
	const { globalTheme } = globals;

	return (
		<div className={`App ${globalTheme}`}>
			<StoryComponent />
		</div>
	);
};
