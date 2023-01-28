import { StoryFn } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/config/i18next/i18n';

export const LocalesDecorator = (StoryComponent: StoryFn) => (
	<I18nextProvider i18n={i18n}>
		<StoryComponent />
	</I18nextProvider>
);
