import { Decorator } from '@storybook/react';
import '@/app/styles/index.css';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';

const StyledPage = styled.div`
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
`;

export const ThemeDecorator: Decorator = (StoryComponent, { globals }) => {
	const { globalTheme } = globals;

	return (
		<div className={`App ${globalTheme}`}>
			<StyledPage>
				<Flex width="100%" height="100%" justify="center">
					<StoryComponent />
				</Flex>
			</StyledPage>
		</div>
	);
};
