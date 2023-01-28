import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nTest from '@/shared/config/i18next/i18nForTesting';
import { StateSchema, StoreProvider } from '@/app/provider/Store';

interface ComponentTestRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const componentTestRender = (
	component: ReactNode,
	options?: ComponentTestRenderOptions,
) =>
	render(
		<MemoryRouter initialEntries={[options?.route ?? '/']}>
			<StoreProvider
				initialState={options?.initialState as StateSchema}
				asyncReducers={options?.asyncReducers as ReducersMapObject<StateSchema>}
			>
				<I18nextProvider i18n={i18nTest}>{component}</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>,
	);
