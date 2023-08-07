import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { SearchChatsByName } from './SearchChatsByName';

describe('SearchChatsByName', () => {
	test('Loading', async () => {
		await act(() =>
			componentTestRender(<SearchChatsByName userId="loadingId" />),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchChatsByName.skeleton'),
			).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(<SearchChatsByName userId="errorId" />),
		);

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchChatsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchChatsByName.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('SearchChatsByName.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() => componentTestRender(<SearchChatsByName userId="userId" />));

		await waitFor(() =>
			expect(
				screen.getByTestId('SearchChatsByName.skeleton'),
			).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('SearchChatsByName.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getAllByTestId((id) => id.startsWith('SearchChatsByName.card')),
			).toHaveLength(3),
		);
	});
});
