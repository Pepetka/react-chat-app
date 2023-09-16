import { LOCAL_STORAGE_AUTH_ACCESS_KEY } from '../../../src/shared/const/localstorage';
import { Chat } from '../../../src/entities/Chat';

export const createChat = (
	{ userId, friendId }: { userId: string; friendId: string },
	accessToken?: string,
) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/chat',
			headers: {
				Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
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

export const deleteChat = (chatId: string, accessToken?: string) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);

	return cy
		.request({
			method: 'DELETE',
			url: 'http://localhost:8000/chat',
			headers: {
				Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
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
				accessToken?: string,
			): Chainable<Chat>;
			deleteChat(chatId: string, accessToken?: string): Chainable<string>;
		}
	}
}
