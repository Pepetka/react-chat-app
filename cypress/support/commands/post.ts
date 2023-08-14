import {
	LOCAL_STORAGE_AUTH_KEY,
	LOCAL_STORAGE_USER_KEY,
} from '../../../src/shared/const/localstorage';
import { User } from '../../../src/shared/types/userCard';
import { Post } from '../../../src/entities/Post';
import { Comment } from '../../../src/shared/types/comment';
import { Relations } from '../../../src/features/ProfileCard/model/types/profileCardSchema';

export const addPost = (token?: string, authData?: User) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	const authDataLS = JSON.parse(
		window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '{}',
	) as User;

	const formData = new FormData();
	formData.append('text', 'Some test post text');
	formData.append('authorId', (authData ?? authDataLS).id);
	formData.append('profileId', (authData ?? authDataLS).id);

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/posts',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: formData,
		})
		.then(({ body }) => {
			const json = new TextDecoder().decode(body);

			return JSON.parse(json) as User;
		});
};

export const deletePost = (id: string, token?: string, authData?: User) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	const authDataLS = JSON.parse(
		window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '{}',
	) as User;

	return cy.request({
		method: 'DELETE',
		url: 'http://localhost:8000/posts',
		headers: {
			Authorization: `Bearer ${token ?? tokenLS}`,
		},
		body: {
			postId: id,
			userId: (authData ?? authDataLS).id,
		},
	});
};

export const addComment = (postId: string, token?: string, authData?: User) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
	const authDataLS = JSON.parse(
		window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '{}',
	) as User;

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/comments',
			headers: {
				Authorization: `Bearer ${token ?? tokenLS}`,
			},
			body: {
				authorId: (authData ?? authDataLS).id,
				text: 'Some test comment text',
				postId,
			},
		})
		.then(({ body }) => {
			return body;
		});
};

export const deleteComment = (id: string, token?: string) => {
	const tokenLS = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

	return cy.request({
		method: 'DELETE',
		url: 'http://localhost:8000/comments',
		headers: {
			Authorization: `Bearer ${token ?? tokenLS}`,
		},
		body: {
			commentId: id,
		},
	});
};

export const testPostCardsNum = (number: number) => {
	cy.getByTestId('Page').scrollTo('bottom');
	cy.wait(500);
	cy.getByTestId('Page').scrollTo('bottom');

	cy.getByTestId('PostList.card').should('have.length', number);
};

export const testStatClick = (statName: string, before = 0, after = 1) => {
	cy.getByTestId(`PostCard.${statName}.number.text`).should(
		'have.text',
		before,
	);
	cy.getByTestId(`PostCard.${statName}.button`).click();
	cy.getByTestId(`PostCard.${statName}.number.text`).should('have.text', after);
};

export const deleteCard = (cardName: string) => {
	cy.getByTestId('Menu.trigger').click();
	cy.getByTestId(`${cardName}.delete`).click();
};

export const testChangeRelations = (
	before: Relations['relations'],
	after: Relations['relations'],
) => {
	cy.getByTestId(`ProfileCard.relations.${before}`).should('exist');
	cy.getByTestId('ProfileCard.relations.button').click();
	cy.getByTestId(`ProfileCard.relations.${after}`).should('exist');
};

declare global {
	namespace Cypress {
		interface Chainable {
			addPost(token?: string, authData?: User): Chainable<Post>;
			deletePost(id: string, token?: string, authData?: User): Chainable<void>;
			addComment(
				postId: string,
				token?: string,
				authData?: User,
			): Chainable<Comment>;
			deleteComment(id: string, token?: string): Chainable<void>;
			testPostCardsNum(number: number): Chainable<void>;
			testStatClick(
				statName: string,
				before?: number,
				after?: number,
			): Chainable<void>;
			deleteCard(cardName: string): Chainable<void>;
			testChangeRelations(
				before: Relations['relations'],
				after: Relations['relations'],
			): Chainable<void>;
		}
	}
}
