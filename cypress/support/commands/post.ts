import {
	LOCAL_STORAGE_AUTH_ACCESS_KEY,
	LOCAL_STORAGE_USER_KEY,
} from '../../../src/shared/const/localstorage';
import { User } from '../../../src/shared/types/userCard';
import { Post } from '../../../src/entities/Post';
import { Comment } from '../../../src/shared/types/comment';
import { Relations } from '../../../src/features/ProfileCard/model/types/profileCardSchema';

export const addPost = (accessToken?: string, authData?: User) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);
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
				Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
			},
			body: formData,
		})
		.then(({ body }) => {
			const json = new TextDecoder().decode(body);

			return JSON.parse(json) as User;
		});
};

export const deletePost = (
	id: string,
	accessToken?: string,
	authData?: User,
) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);
	const authDataLS = JSON.parse(
		window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '{}',
	) as User;

	return cy.request({
		method: 'DELETE',
		url: 'http://localhost:8000/posts',
		headers: {
			Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
		},
		body: {
			postId: id,
			userId: (authData ?? authDataLS).id,
		},
	});
};

export const addComment = (
	postId: string,
	accessToken?: string,
	authData?: User,
) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);
	const authDataLS = JSON.parse(
		window.localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? '{}',
	) as User;

	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/comments',
			headers: {
				Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
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

export const deleteComment = (id: string, accessToken?: string) => {
	const accessTokenLS = window.localStorage.getItem(
		LOCAL_STORAGE_AUTH_ACCESS_KEY,
	);

	return cy.request({
		method: 'DELETE',
		url: 'http://localhost:8000/comments',
		headers: {
			Authorization: `Bearer ${accessToken ?? accessTokenLS}`,
		},
		body: {
			commentId: id,
		},
	});
};

export const testPostCardsNum = (number: number) => {
	cy.getByTestId('Page').scrollTo('bottom').wait(500).scrollTo('bottom');
	cy.getByTestId('PostList.card').should('have.length', number);
};

export const testCommentsCardNum = (number: number) => {
	cy.getByTestId('PostCard.comments.number.text').should('have.text', number);
	cy.getByTestId('PostComments.card').should('have.length', number);
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

export const addNewCard = (formName: string, text: string) => {
	const form = cy.getByTestId(`${formName}.form`);
	form.clear().type(`${text}{shift}{enter}`);
	cy.wait(500);
};

declare global {
	namespace Cypress {
		interface Chainable {
			addPost(accessToken?: string, authData?: User): Chainable<Post>;
			deletePost(
				id: string,
				accessToken?: string,
				authData?: User,
			): Chainable<void>;
			addNewCard(formName: string, text: string): Chainable<void>;
			addComment(
				postId: string,
				accessToken?: string,
				authData?: User,
			): Chainable<Comment>;
			deleteComment(id: string, accessToken?: string): Chainable<void>;
			testPostCardsNum(number: number): Chainable<void>;
			testCommentsCardNum(number: number): Chainable<void>;
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
