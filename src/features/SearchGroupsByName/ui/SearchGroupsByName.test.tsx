import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { SearchGroupsByName } from './SearchGroupsByName';

describe('SearchGroupsByName', () => {
	test('Loading', async () => {
		await act(() =>
			componentTestRender(
				<SearchGroupsByName profileId="loadingId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchGroupsByName.skeleton'),
			).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(
				<SearchGroupsByName profileId="errorId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchGroupsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchGroupsByName.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchGroupsByName.error'),
			).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(
				<SearchGroupsByName profileId="profileId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchGroupsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchGroupsByName.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getAllByTestId((id) => id.startsWith('SearchGroupsByName.card')),
			).toHaveLength(3),
		);
	});
});
