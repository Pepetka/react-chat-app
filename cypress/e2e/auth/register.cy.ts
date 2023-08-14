import { getRegisterPagePath } from '../../../src/shared/const/router';
import { LOCAL_STORAGE_AUTH_KEY } from '../../../src/shared/const/localstorage';

describe('Register', () => {
	beforeEach(function () {
		cy.login('testUser').as('userData');
		cy.visitPage('RegisterPage', getRegisterPagePath());
	});

	afterEach(function () {
		cy.deleteUser(this.userData.token);
	});

	it('Register an existing user', function () {
		cy.registerTestUser();
		cy.testFormServerError(
			'RegisterForm',
			'User with this username already exists',
		);
	});

	it('Register a new user', function () {
		cy.registerTestUser('test username', 'test password');
		cy.getByTestId('ProfilePage', { timeout: 3000 }).should('be.visible');

		cy.window().then((win) => {
			const token = win.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) ?? '';

			cy.deleteUser(token, 'test username', 'test password');
		});
	});
});
