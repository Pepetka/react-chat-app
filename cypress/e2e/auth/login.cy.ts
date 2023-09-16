import { getLoginPagePath } from '../../../src/shared/const/router';

describe('Login', () => {
	beforeEach(function () {
		cy.login('testUser').as('userData');
		cy.visitPage('LoginPage', getLoginPagePath());
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken);
	});

	it('Unregistered user login', function () {
		cy.loginTestUser('unregisteredUser');
		cy.testFormServerError('LoginForm', 'User not found');
	});

	it('Registered user login', function () {
		cy.loginTestUser('testUser', 'WrongPassword');
		cy.testFormServerError('LoginForm', 'Wrong password');

		cy.loginTestUser();
		cy.getByTestId('ProfilePage').should('exist');
	});
});
