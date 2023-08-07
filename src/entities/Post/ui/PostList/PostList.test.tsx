import '@testing-library/jest-dom';
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { VirtuosoMockContext } from 'react-virtuoso';
import { componentTestRender } from '@/shared/config/test';
import { PostList } from './PostList';

describe('PostList', () => {
	test('Loading', async () => {
		await act(() =>
			componentTestRender(
				<PostList profileId="loadingId" userId="loadingId" admin={true} />,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostList.skeleton')).toBeInTheDocument(),
		);
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(
				<PostList profileId="errorId" userId="errorId" admin={true} />,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostList.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('PostList.skeleton'),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostList.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(
				<VirtuosoMockContext.Provider
					value={{ viewportHeight: 300, itemHeight: 100 }}
				>
					<PostList profileId="profileId" userId="userId" admin={true} />,
				</VirtuosoMockContext.Provider>,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostList.skeleton')).toBeInTheDocument(),
		);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId('PostList.skeleton'),
		);

		await waitFor(() =>
			expect(
				screen.getAllByTestId((id) => id.startsWith('PostList.card')),
			).toHaveLength(3),
		);
	});
});
