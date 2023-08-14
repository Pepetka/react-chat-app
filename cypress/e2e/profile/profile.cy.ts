import { getProfilePagePath } from '../../../src/shared/const/router';
import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';

describe('profile', () => {
	beforeEach(function () {
		cy.login()
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.addPost().as('post1');
				cy.addPost().as('post2');
				cy.addPost()
					.as('post3')
					.then(() => {
						cy.addComment(this.post3.id).as('comment1');
						cy.addComment(this.post3.id).as('comment2');
						cy.addComment(this.post3.id).as('comment3');
					});

				cy.visit(getProfilePagePath(this.userData.id));
			});
	});

	afterEach(function () {
		cy.deletePost(this.post1.id);
		cy.deletePost(this.post2.id);
		cy.deletePost(this.post3.id);

		cy.deleteComment(this.comment1.id);
		cy.deleteComment(this.comment1.id);
		cy.deleteComment(this.comment1.id);

		cy.deleteUser(this.userData.token);
	});

	it('Get posts', function () {
		cy.getByTestId('ProfilePage', { timeout: 3000 });

		cy.getByTestId('Page').scrollTo('bottom');
		cy.wait(500).getByTestId('Page').scrollTo('bottom');
		cy.getByTestId('PostList.card').should('have.length', 3);
	});

	it('Add/Delete post', function () {
		cy.getByTestId('ProfilePage', { timeout: 3000 });

		const form = cy.getByTestId('PostForm.form');
		form.clear().type('New test post{shift}{enter}');

		cy.wait(500);

		cy.getByTestId('Page').scrollTo('bottom');
		cy.wait(500).getByTestId('Page').scrollTo('bottom');

		cy.getByTestId('PostList.card').should('have.length', 4);

		const newPost = cy.contains(
			'[data-testid^="PostList.card"]',
			'New test post',
		);

		newPost.within(() => {
			cy.getByTestId('Menu.trigger').click();
			cy.getByTestId('PostCard.delete').click();
		});

		cy.wait(500);

		cy.getByTestId('PostList.card').should('have.length', 3);
	});

	it('Add/Delete comment', function () {
		cy.getByTestId('ProfilePage', { timeout: 3000 });

		cy.getByTestId('Page').scrollTo('bottom');
		cy.wait(500).getByTestId('Page').scrollTo('bottom');

		const post = cy.getByTestId('PostList.card').last();

		post.within(() => {
			cy.getByTestId('PostCard.comments.number.text').should('have.text', 3);
			cy.getByTestId('PostCard.comments.button').click();
			cy.getByTestId('PostComments.card').should('have.length', 3);

			const form = cy.getByTestId('PostComments.form');
			form.clear().type('New test comment{shift}{enter}');

			cy.wait(500);

			cy.getByTestId('PostCard.comments.number.text').should('have.text', 4);
			cy.getByTestId('PostComments.card').should('have.length', 4);

			const newComment = cy.contains(
				'[data-testid^="PostComments.card"]',
				'New test comment',
			);

			newComment.within(() => {
				cy.getByTestId('Menu.trigger').click();
				cy.getByTestId('CommentCard.delete').click();
			});

			cy.getByTestId('PostCard.comments.number.text').should('have.text', 3);
			cy.getByTestId('PostComments.card').should('have.length', 3);
		});
	});
});
