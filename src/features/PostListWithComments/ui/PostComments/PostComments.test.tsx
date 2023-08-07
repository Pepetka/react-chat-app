import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/test';
import {
	mockServerSocket,
	resetMockSocket,
} from '@/shared/config/socket/socketMock';
import { Comment } from '@/shared/types/comment';
import { PostComments } from './PostComments';

describe('PostComments', () => {
	afterAll(() => {
		resetMockSocket();
	});

	test('Rejected', async () => {
		mockServerSocket.on('comments', () => {
			mockServerSocket.emit('comments', [] as Array<Comment>, true);
		});

		await act(() =>
			componentTestRender(
				<PostComments userId="userId" postId="postId" commentsNum={3} />,
			),
		);

		await waitFor(() =>
			expect(screen.getByTestId('PostComments.error')).toBeInTheDocument(),
		);
	});

	test('Fulfilled', async () => {
		mockServerSocket.on('comments', () => {
			mockServerSocket.emit('comments', {
				postId: 'postId',
				comments: new Array(3).fill(1).map((_, index) => ({
					id: `${index}`,
					createdAt: '',
					text: 'Some comment',
					author: {
						id: 'userId',
						name: 'Name',
						avatar: 'image',
					},
					postId: 'postId',
				})),
			} as { postId: string; comments: Array<Comment> });
		});

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
