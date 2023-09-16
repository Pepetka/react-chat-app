import { selectByTestId } from '../../helpers/selectByTestId';
import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';
import { User } from '../../../src/shared/types/userCard';

export const getByTestId = (
	testId: string,
	options?: Parameters<typeof cy.get>[1],
) => cy.get(selectByTestId(testId), options);

export const findByTestId = (
	testId: string,
	options?: Parameters<typeof cy.find>[1],
) => cy.find(selectByTestId(testId), options);

export const visitPage = (name: string, path: string) => {
	cy.visit(path);
	cy.getByTestId(name).should('exist');
};

export const setUserLocal = (body: User) => {
	setUserDataToLocal(body);
};

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(
				testId: string,
				options?: Parameters<typeof cy.get>[1],
			): Chainable<HTMLElement>;
			findByTestId(
				testId: string,
				options?: Parameters<typeof cy.find>[1],
			): Chainable<HTMLElement>;
			visitPage(name: string, path: string): Chainable<void>;
			setUserLocal(body: User): Chainable<void>;
		}
	}
}
