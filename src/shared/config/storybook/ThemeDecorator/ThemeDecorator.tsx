import { Decorator } from '@storybook/react';
import '@/app/styles/index.css';

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
	const { globalTheme } = globals;

	return (
		<div
			className={`App ${globalTheme}`}
			style={{ height: 'auto', minHeight: '100dvh' }}
		>
			<StoryComponent />
		</div>
	);
};
