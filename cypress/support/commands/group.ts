import { Group } from '@/entities/Group';
import { LOCAL_STORAGE_AUTH_KEY } from '../../../src/shared/const/localstorage';

export const createGroup = (name: string, token?: string) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/group',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: {
				name,
			},
		})
		.then(({ body }) => {
			return body;
		});
};

export const deleteGroup = (groupId: string, token?: string) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy
		.request({
			method: 'DELETE',
			url: 'http://localhost:8000/group',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: { groupId },
		})
		.then(({ body }) => {
			return body;
		});
};

export const testGroupForm = (
	name: string,
	groupName: string,
	description: string,
) => {
	const groupDescriptionInput = cy.getByTestId(`${name}.input.description`);
	const groupNameInput = cy.getByTestId(`${name}.input.name`);
	groupDescriptionInput.clear().type(description);
	groupNameInput.clear().type(`${groupName}{enter}`);

	cy.getByTestId('GroupPage', { timeout: 5000 }).should('exist');
	cy.contains(description).should('exist');
	cy.contains(groupName).should('exist');
};

declare global {
	namespace Cypress {
		interface Chainable {
			createGroup(name: string, token?: string): Chainable<Group>;
			deleteGroup(groupId: string, token?: string): Chainable<string>;
			testGroupForm(
				name: string,
				groupName: string,
				description: string,
			): Chainable<void>;
		}
	}
}
