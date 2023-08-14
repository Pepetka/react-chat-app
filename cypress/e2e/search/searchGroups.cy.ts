import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { getGroupsListPagePath } from '../../../src/shared/const/router';

describe('searchGroups', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.createGroup({
					name: 'Group1',
					userId: this.userData.id,
				}).as('group1');
				cy.createGroup({
					name: 'Group2',
					userId: this.userData.id,
				}).as('group2');
				cy.visitPage('GroupsListPage', getGroupsListPagePath(this.userData.id));
			});
	});

	afterEach(function () {
		cy.deleteUser(this.userData.token);

		cy.deleteGroup(this.group1.id);
		cy.deleteGroup(this.group2.id);
	});

	it('Filter groups', function () {
		cy.getByTestId(`SearchGroupsByName.card.${this.group1.id}`).should('exist');
		cy.getByTestId(`SearchGroupsByName.card.${this.group2.id}`).should('exist');

		cy.searchData('SearchGroupsByName', 'Group1');
		cy.testSearchResult(
			'SearchGroupsByName.card',
			this.group1.id,
			this.group2.id,
		);

		cy.searchData('SearchGroupsByName', 'Group2');
		cy.testSearchResult(
			'SearchGroupsByName.card',
			this.group2.id,
			this.group1.id,
		);
	});
});
