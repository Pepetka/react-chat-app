import { Decorator } from '@storybook/react';
import '@/app/styles/index.css';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';

const StyledPage = styled.div`
	min-height: 100vh;
	width: 100%;
	overflow-x: hidden;
`;

const ContentWrapper = styled.div<{ isMessengerPage: boolean }>`
	width: 80%;
	min-height: 100vh;
	margin-inline: auto;
	padding-bottom: ${(props) =>
		props.isMessengerPage && isMobile ? '0' : 'var(--page-padding)'};

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const PageDecorator =
	(isMessengerPage = false): Decorator =>
	(StoryComponent) => {
		return (
			<StyledPage>
				<ContentWrapper isMessengerPage={isMessengerPage}>
					<Flex width="100%" height="100%" justify="center">
						<StoryComponent />
					</Flex>
				</ContentWrapper>
			</StyledPage>
		);
	};
