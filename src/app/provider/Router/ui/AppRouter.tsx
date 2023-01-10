import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../routeConfig/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
	const renderWithWrapper = useCallback(
		({ path, element, authOnly }: AppRoutesProps) => {
			const routeElement = (
				<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
			);

			return (
				<Route
					key={path}
					path={path}
					element={
						authOnly ? <RequireAuth>{routeElement}</RequireAuth> : routeElement
					}
				/>
			);
		},
		[],
	);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
