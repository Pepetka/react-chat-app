import '@testing-library/jest-dom';
import { waitFor, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/provider/Store';
import { RequireAuth } from './RequireAuth';

describe('RequireAuth', () => {
	const routerFn = (authOnly: boolean) =>
		createMemoryRouter(
			[
				{
					path: '/',
					element: (
						<RequireAuth authOnly={authOnly}>
							<div data-testid="RequireAuth.content">Content</div>
						</RequireAuth>
					),
				},
				{
					path: '/login',
					element: <div data-testid="RequireAuth.login">Login</div>,
				},
				{
					path: '/profile/id',
					element: <div data-testid="RequireAuth.profile">profile</div>,
				},
			],
			{
				initialEntries: ['/'],
				initialIndex: 0,
			},
		);

	test('Content render', async () => {
		const router = routerFn(false);

		await act(() =>
			render(
				<StoreProvider>
					<RouterProvider router={router} />
				</StoreProvider>,
			),
		);

		await waitFor(() => expect(router.state.location.pathname).toEqual('/'));
	});

	test('Login render', async () => {
		const router = routerFn(true);

		await act(() =>
			render(
				<StoreProvider>
					<RouterProvider router={router} />
				</StoreProvider>,
			),
		);

		await waitFor(() =>
			expect(router.state.location.pathname).toEqual('/login'),
		);
	});

	test('Profile render', async () => {
		const router = routerFn(false);

		await act(() =>
			render(
				<StoreProvider
					initialState={
						{ user: { _inited: true, authData: { id: 'id' } } } as StateSchema
					}
				>
					<RouterProvider router={router} />
				</StoreProvider>,
			),
		);

		await waitFor(() =>
			expect(router.state.location.pathname).toEqual('/profile/id'),
		);
	});
});
