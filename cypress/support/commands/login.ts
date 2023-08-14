export const loginTestUser = (
	username = 'testUser',
	password = 'TestPassword',
) => {
	const usernameInput = cy.getByTestId('LoginForm.input.username');
	const passwordInput = cy.getByTestId('LoginForm.input.password');
	const form = cy.getByTestId('LoginForm.form');

	usernameInput.clear().type(username);
	passwordInput.clear().type(password);

	form.submit();
};

export const registerTestUser = (
	username = 'testUser',
	password = 'TestPassword',
) => {
	const usernameInput = cy.getByTestId('RegisterForm.input.username');
	const passwordInput = cy.getByTestId('RegisterForm.input.password');
	const ageInput = cy.getByTestId('RegisterForm.input.age');
	const emailInput = cy.getByTestId('RegisterForm.input.email');
	const firstnameInput = cy.getByTestId('RegisterForm.input.firstname');
	const lastnameInput = cy.getByTestId('RegisterForm.input.lastname');
	const agreeInput = cy.getByTestId('RegisterForm.input.agree');
	const form = cy.getByTestId('RegisterForm.form');

	usernameInput.clear().type(username);
	passwordInput.clear().type(password);
	ageInput.clear().type('23');
	emailInput.clear().type('test@email.ru');
	firstnameInput.clear().type('test firstName');
	lastnameInput.clear().type('test lastName');
	agreeInput.check();

	form.submit();
};

export const testFormServerError = (
	name: 'LoginForm' | 'RegisterForm',
	errorValue: string,
) => {
	cy.getByTestId(`${name}.error.server`)
		.should('exist')
		.find('p')
		.should('have.text', errorValue);
};

declare global {
	namespace Cypress {
		interface Chainable {
			loginTestUser(username?: string, password?: string): Chainable<void>;
			registerTestUser(username?: string, password?: string): Chainable<void>;
			testFormServerError(
				name: 'LoginForm' | 'RegisterForm',
				errorValue: string,
			): Chainable<void>;
		}
	}
}
