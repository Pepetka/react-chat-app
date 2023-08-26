import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import { resetMockSocket } from '@/shared/config/socket/socketMock';
import { PostComments } from './PostComments';

describe('PostComments', () => {
	afterAll(() => {
		resetMockSocket();
	});

	test('Rejected', async () => {
		await act(() =>
			componentTestRender(
				<PostComments userId="userId" postId="errorId" commentsNum={3} />,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostComments.error')).toBeInTheDocument(),
		);
	});

	test('Pending', async () => {
		await act(() =>
			componentTestRender(
				<PostComments userId="userId" postId="LoadingId" commentsNum={3} />,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostComments.skeleton')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		await act(() =>
			componentTestRender(
				<PostComments userId="userId" postId="postId" commentsNum={3} />,
			),
		);

		await waitFor(() => {
			expect(
				screen.getAllByTestId((id) => id.startsWith('PostComments.card')),
			).toHaveLength(3);
		});
	});
});
