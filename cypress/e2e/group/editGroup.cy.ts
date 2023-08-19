import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { getEditGroupPagePath } from '../../../src/shared/const/router';

describe('editGroup', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.createGroup('Test group', this.userData.token)
					.as('groupData')
					.then(() => {
						cy.visitPage(
							'EditGroupPage',
							getEditGroupPagePath(this.groupData.id),
						);
					});
			});
	});

	afterEach(function () {
		cy.deleteGroup(this.groupData.id, this.userData.token);
		cy.deleteUser(this.userData.token);
	});

	it('Edit group', function () {
		cy.testGroupForm('EditGroupForm', 'New group name', 'New test description');
	});
});
