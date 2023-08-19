import { Chat } from '../../../src/entities/Chat';

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
		}
	}
}
