import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nTest from '@/shared/config/i18next/i18nForTesting';
import { StateSchema, StoreProvider } from '@/app/provider/Store';
import { ThemeProvider } from '@/app/provider/Theme';

interface ComponentTestRenderOptions {
	route?: string;
	routeTemplate?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const componentTestRender = (
	component: ReactNode,
	options?: ComponentTestRenderOptions,
) => {
	const route = options?.route ?? '/';
	const initialState = (options?.initialState ?? {
		user: { _inited: true, authData: {} },
	}) as StateSchema;
	const asyncReducers =
		options?.asyncReducers as ReducersMapObject<StateSchema>;
	const routeTemplate = options?.routeTemplate ?? route;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
				<ThemeProvider>
					<I18nextProvider i18n={i18nTest}>
						<Routes>
							<Route path={routeTemplate ?? '*'} element={component} />
						</Routes>
					</I18nextProvider>
				</ThemeProvider>
			</StoreProvider>
		</MemoryRouter>,
	);
};
