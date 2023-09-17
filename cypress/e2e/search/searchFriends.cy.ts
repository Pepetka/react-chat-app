import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import {
	getFriendsPagePath,
	getMainPagePath,
} from '../../../src/shared/const/router';

describe('searchFriends', () => {
	beforeEach(function () {
		cy.login('testFriend').as('friendData');
		cy.login('testOther').as('otherData');

		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.visitPage('FriendsPage', getFriendsPagePath(this.userData.id));
			});
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken, this.userData.username);
		cy.deleteUser(this.friendData.accessToken, this.friendData.username);
		cy.deleteUser(this.otherData.accessToken, this.otherData.username);
	});

	it('Add friend', function () {
		cy.searchFriendCardInGroup('Others', this.friendData.id);
		cy.searchFriendCardInGroup('Others', this.otherData.id);
		cy.getByTestId('SearchFriendsByName.group').should('have.length', 1);

		cy.friendCardClick(this.friendData.id);
		cy.searchFriendCardInGroup('Following', this.friendData.id);
		cy.searchFriendCardInGroup('Others', this.otherData.id);
		cy.getByTestId('SearchFriendsByName.group').should('have.length', 2);

		cy.friendCardClick(this.friendData.id);
		cy.searchFriendCardInGroup('Others', this.friendData.id);
		cy.searchFriendCardInGroup('Others', this.otherData.id);
		cy.getByTestId('SearchFriendsByName.group').should('have.length', 1);
	});

	it('Filter users', function () {
		cy.getByTestId(`SearchFriendsByName.card.${this.friendData.id}`).should(
			'exist',
		);
		cy.getByTestId(`SearchFriendsByName.card.${this.otherData.id}`).should(
			'exist',
		);

		cy.searchData('SearchFriendsByName', 'testFriend');
		cy.testSearchResult(
			'SearchFriendsByName.card',
			this.friendData.id,
			this.otherData.id,
		);

		cy.searchData('SearchFriendsByName', 'testOther');
		cy.testSearchResult(
			'SearchFriendsByName.card',
			this.otherData.id,
			this.friendData.id,
		);
	});

	it('Search users by NavBar', function () {
		cy.visitPage('MainPage', getMainPagePath());

		const searchInput = cy.getByTestId('NavBar.input');
		searchInput.clear().type('testFriend{enter}');
		cy.getByTestId('FriendsPage', { timeout: 3000 }).should('exist');
		cy.testSearchResult(
			'SearchFriendsByName.card',
			this.friendData.id,
			this.otherData.id,
		);
	});
});
