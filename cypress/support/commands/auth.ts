import { User } from '../../../src/shared/types/userCard';

export const login = (username = 'testUser') =>
	cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/register',
			headers: {},
			body: {
				username,
				password: 'TestPassword',
				age: '23',
				email: 'test@gmail.com',
				firstname: 'User',
				lastname: 'User',
			},
		})
		.then(({ body }) => body);

export const deleteUser = (
	token: string,
	username = 'testUser',
	password = 'TestPassword',
) =>
	cy.request({
		method: 'DELETE',
		url: 'http://localhost:8000/user',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: {
			username,
			password,
		},
	});

declare global {
	namespace Cypress {
		interface Chainable {
			login(username?: string): Chainable<User>;
			deleteUser(
				token: string,
				username?: string,
				password?: string,
			): Chainable<void>;
		}
	}
}
