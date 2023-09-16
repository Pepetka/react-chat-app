import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { getChatsPagePath } from '../../../src/shared/const/router';

describe('searchChats', () => {
	beforeEach(function () {
		cy.login('testFriend1').as('friend1Data');
		cy.login('testFriend2').as('friend2Data');

		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.createChat({
					userId: this.userData.id,
					friendId: this.friend1Data.id,
				}).as('chat1');
				cy.createChat({
					userId: this.userData.id,
					friendId: this.friend2Data.id,
				}).as('chat2');
				cy.visitPage('ChatsPage', getChatsPagePath());
			});
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken, this.userData.username);
		cy.deleteUser(this.friend1Data.accessToken, this.friend1Data.username);
		cy.deleteUser(this.friend2Data.accessToken, this.friend2Data.username);

		cy.deleteChat(this.chat1.id);
		cy.deleteChat(this.chat2.id);
	});

	it('Filter chats', function () {
		cy.getByTestId(`SearchChatsByName.card.${this.chat1.id}`).should('exist');
		cy.getByTestId(`SearchChatsByName.card.${this.chat2.id}`).should('exist');

		cy.searchData('SearchChatsByName', 'testFriend1');
		cy.testSearchResult('SearchChatsByName.card', this.chat1.id, this.chat2.id);

		cy.searchData('SearchChatsByName', 'testFriend2');
		cy.testSearchResult('SearchChatsByName.card', this.chat2.id, this.chat1.id);
	});
});
