import {
	getCreateGroupPagePath,
	getGroupPagePath,
} from '../../../src/shared/const/router';
import { usePathParams } from '../../../src/shared/hooks/usePathParams';
import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';

describe('createGroup', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.visitPage(
					'CreateGroupPage',
					getCreateGroupPagePath(this.userData.id),
				);
			});
	});

	afterEach(function () {
		cy.deleteUser(this.userData.accessToken);
	});

	it('Edit group', function () {
		cy.testGroupForm('CreateGroupForm', 'Test group name', 'Test description');

		cy.location().then(({ pathname }) => {
			const { id } = usePathParams<{ id: string }>(
				getGroupPagePath(':id'),
				pathname,
			);
			cy.deleteGroup(id, this.userData.accessToken);
		});
	});
});
