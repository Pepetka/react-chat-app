import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../routeConfig/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '@/shared/ui/PageLoader';
import { useTheme } from '@/shared/hooks/useTheme';

export const AppRouter = memo(() => {
	const { theme } = useTheme();

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
