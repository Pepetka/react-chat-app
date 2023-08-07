import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { SearchFriendsByName } from './SearchFriendsByName';

describe('SearchFriendsByName', () => {
	test('Loading', async () => {
		await act(() =>
			componentTestRender(
				<SearchFriendsByName profileId="loadingId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchFriendsByName.skeleton'),
			).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(
				<SearchFriendsByName profileId="errorId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchFriendsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchFriendsByName.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchFriendsByName.error'),
			).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(
				<SearchFriendsByName profileId="profileId" userId="userId" />,
			),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchFriendsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchFriendsByName.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getAllByTestId((id) =>
					id.startsWith('SearchFriendsByName.card'),
				),
			).toHaveLength(3),
		);
	});
});
