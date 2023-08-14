import { LOCAL_STORAGE_AUTH_KEY } from '../../../src/shared/const/localstorage';
import { Chat } from '../../../src/entities/Chat';
import { Group } from '../../../src/entities/Group';

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

export const createGroup = (
	{ userId, name }: { userId: string; name: string },
	token?: string,
) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/group',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: {
				userId,
				name,
			},
		})
		.then(({ body }) => {
			return body;
		});
};

export const deleteGroup = (groupId: string, token?: string) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'DELETE',
			url: 'http://localhost:8000/group',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: { groupId },
		})
		.then(({ body }) => {
			return body;
		});
};

export const searchData = (name: string, search: string) => {
	const searchInput = cy.getByTestId(`${name}.input`);
	searchInput.clear().type(search);
	cy.wait(3000);
};

export const testSearchResult = (
	baseName: string,
	exist: string,
	notExist: string,
) => {
	cy.getByTestId(`${baseName}.${exist}`).should('exist');
	cy.getByTestId(`${baseName}.${notExist}`).should('not.exist');
};

export const friendCardClick = (cardId: string) => {
	const friend = cy
		.getByTestId(`SearchFriendsByName.card.${cardId}`)
		.should('exist');
	friend.trigger('mouseover');
	friend.within(() => {
		cy.get('button').click();
	});
};

export const searchFriendCardInGroup = (groupName: string, cardId: string) => {
	const block = cy.getByTestId(`SearchFriendsByName.group.${groupName}`);
	block.within(() => {
		cy.getByTestId(`SearchFriendsByName.card.${cardId}`).should('exist');
	});
};

declare global {
	namespace Cypress {
		interface Chainable {
			searchData(name: string, search: string): Chainable<void>;
			testSearchResult(
				baseName: string,
				exist: string,
				notExist: string,
			): Chainable<void>;
			friendCardClick(cardId: string): Chainable<void>;
			searchFriendCardInGroup(
				groupName: string,
				cardId: string,
			): Chainable<void>;
			createChat(
				data: { userId: string; friendId: string },
				token?: string,
			): Chainable<Chat>;
			deleteChat(chatId: string, token?: string): Chainable<string>;
			createGroup(
				data: { userId: string; name: string },
				token?: string,
			): Chainable<Group>;
			deleteGroup(groupId: string, token?: string): Chainable<string>;
		}
	}
}
