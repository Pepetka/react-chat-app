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

				cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
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
		cy.testPostCardsNum(3);
	});

	it('Add/Delete post', function () {
		cy.addNewCard('PostForm', 'New test post');
		cy.testPostCardsNum(4);

		const newPost = cy.contains(
			'[data-testid^="PostList.card"]',
			'New test post',
		);
		newPost.within(() => {
			cy.deleteCard('PostCard');
		});

		cy.testPostCardsNum(3);
	});

	it('Add/Delete comment', function () {
		cy.testPostCardsNum(3);

		const post = cy.getByTestId('PostList.card').last();
		post.within(() => {
			cy.testStatClick('comments', 3, 3);
			cy.getByTestId('PostComments.card').should('have.length', 3);

			cy.addNewCard('PostComments', 'New test comment');
			cy.testCommentsCardNum(4);

			const newComment = cy.contains(
				'[data-testid^="PostComments.card"]',
				'New test comment',
			);
			newComment.within(() => {
				cy.deleteCard('CommentCard');
			});

			cy.testCommentsCardNum(3);
		});
	});
});
