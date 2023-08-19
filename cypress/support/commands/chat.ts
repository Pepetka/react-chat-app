import { LOCAL_STORAGE_AUTH_KEY } from '../../../src/shared/const/localstorage';
import { Chat } from '../../../src/entities/Chat';

export const createChat = (
	{ userId, friendId }: { userId: string; friendId: string },
	token?: string,
) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/chat',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: {
				userId,
				friendId,
				chatName: 'Test chat',
			},
		})
		.then(({ body }) => {
			return body;
		});
};

export const deleteChat = (chatId: string, token?: string) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'DELETE',
			url: 'http://localhost:8000/chat',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: { chatId },
		})
		.then(({ body }) => {
			return body;
		});
};

declare global {
	namespace Cypress {
		interface Chainable {
			createChat(
				data: { userId: string; friendId: string },
				token?: string,
			): Chainable<Chat>;
			deleteChat(chatId: string, token?: string): Chainable<string>;
		}
	}
}
