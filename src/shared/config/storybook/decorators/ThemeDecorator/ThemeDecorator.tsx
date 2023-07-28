import { Decorator } from '@storybook/react';
import '@/app/styles/index.css';
import styled from 'styled-components';

const App = styled.div`
	font: var(--font-m);
	background-color: var(--bg-color);
	color: var(--primary-color);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
	const { globalTheme } = globals;

	return (
		<App className={globalTheme} data-scroll>
			<StoryComponent />
		</App>
	);
};
