import { getRegisterPagePath } from '../../../src/shared/const/router';
import { LOCAL_STORAGE_AUTH_ACCESS_KEY } from '../../../src/shared/const/localstorage';

describe('Register', () => {
	beforeEach(function () {
		cy.login('testUser').as('userData');
		cy.visitPage('RegisterPage', getRegisterPagePath());
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken);
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
		cy.getByTestId('ProfilePage', { timeout: 5000 }).should('exist');

		cy.window().then((win) => {
			const accessToken =
				win.localStorage.getItem(LOCAL_STORAGE_AUTH_ACCESS_KEY) ?? '';

			cy.deleteUser(accessToken, 'test username', 'test password');
		});
	});
});
