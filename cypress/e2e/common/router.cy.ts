import {
	getLoginPagePath,
	getMainPagePath,
	getProfilePagePath,
} from '../../../src/shared/const/router';
import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';

describe('Router', () => {
	describe('Not login user ', () => {
		it('For all users', function () {
			cy.visitPage('MainPage', getMainPagePath());
		});

		it('Only for authorized users', function () {
			cy.visitPage('LoginPage', getProfilePagePath('testId'));
		});

		it('Only for unauthorized users', function () {
			cy.visitPage('LoginPage', getLoginPagePath());
		});

		it('Not found path', function () {
			cy.visitPage('NotFoundPage', '/somePagePath');
		});
	});

	describe('Login user ', () => {
		beforeEach(function () {
			cy.login().then(setUserDataToLocal).as('userData');
		});

		afterEach(function () {
			cy.deleteUser(this.userData.token);
		});

		it('For all users', function () {
			cy.visitPage('MainPage', getMainPagePath());
		});

		it('Only for authorized users', function () {
			cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		});

		it('Only for unauthorized users', function () {
			cy.visitPage('ProfilePage', getLoginPagePath());
		});

		it('Not found path', function () {
			cy.visitPage('NotFoundPage', '/somePagePath');
		});
	});
});
