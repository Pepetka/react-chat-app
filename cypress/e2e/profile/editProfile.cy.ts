import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { getEditProfilePagePath } from '../../../src/shared/const/router';

describe('editProfile', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.visitPage(
					'EditProfilePage',
					getEditProfilePagePath(this.userData.id),
				);
			});
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken);
	});

	it('Edit profile', function () {
		const userStatus = cy.getByTestId('EditProfileForm.input.status');
		const userFirstname = cy.getByTestId('EditProfileForm.input.firstname');
		userStatus.clear().type('New test user status');
		userFirstname.clear().type('New firstname{enter}');

		cy.getByTestId('ProfilePage', { timeout: 5000 }).should('exist');
		cy.contains('New test user status').should('exist');
		cy.contains('New firstname').should('exist');
	});
});
