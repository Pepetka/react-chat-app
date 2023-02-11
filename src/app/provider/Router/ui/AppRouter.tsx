import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
	const renderWithWrapper = useCallback(
		({ path, element, authOnly }: AppRoutesProps) => {
			const routeElement = (
				<Suspense fallback={<PageLoader />}>{element}</Suspense>
			);

			return (
				<Route
					key={path}
					path={path}
					element={
						authOnly !== undefined ? (
							<RequireAuth authOnly={authOnly}>{routeElement}</RequireAuth>
						) : (
							routeElement
						)
					}
				/>
			);
		},
		[],
	);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
