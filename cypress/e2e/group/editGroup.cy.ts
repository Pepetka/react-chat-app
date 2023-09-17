import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { getEditGroupPagePath } from '../../../src/shared/const/router';

describe('editGroup', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.createGroup('Test group', this.userData.accessToken)
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
		cy.deleteGroup(this.groupData.id, this.userData.accessToken);
		cy.deleteUser(this.userData.accessToken);
	});

	it('Edit group', function () {
		cy.testGroupForm('EditGroupForm', 'New group name', 'New test description');
	});
});
