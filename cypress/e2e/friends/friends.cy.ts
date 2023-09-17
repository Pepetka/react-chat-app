import { getProfilePagePath } from '../../../src/shared/const/router';
import { setUserDataToLocal } from '../../helpers/setUserDataToLocal';

describe('friends', () => {
	beforeEach(function () {
		cy.login('friendUser')
			.as('friendData')
			.then(() => {
				cy.addPost(this.friendData.accessToken, this.friendData).as('post1');
			});

		cy.login('testUser')
			.then(setUserDataToLocal)
			.as('userData')
			.then(() => {
				cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
			});
	});

	afterEach(function () {
		cy.deletePost(this.post1.id);

		cy.deleteUser(this.friendData.accessToken, this.friendData.username);
		cy.deleteUser(this.userData.accessToken, this.userData.username);
	});

	it("Like/Dislike a friend's post", function () {
		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testPostCardsNum(1);

		const post = cy.getByTestId('PostList.card');
		post.within(() => {
			cy.testStatClick('likes');
			cy.testStatClick('likes', 1, 0);

			cy.testStatClick('likes');
			cy.testStatClick('dislikes');
			cy.testStatClick('dislikes', 1, 0);

			cy.getByTestId(`PostCard.likes.number.text`).should('have.text', 0);
		});
	});

	it("Share a friend's post", function () {
		cy.testPostCardsNum(0);

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testPostCardsNum(1);

		const post = cy.getByTestId('PostList.card');
		post.within(() => {
			cy.testStatClick('shared');
		});

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.testPostCardsNum(1);

		const newPost = cy.getByTestId('PostList.card');
		newPost.within(() => {
			cy.deleteCard('PostCard');
		});
		cy.testPostCardsNum(0);

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testPostCardsNum(1);
	});

	it('Follow/Unfollow', function () {
		cy.getByTestId('SocialCard.cards.Following.number.title').should(
			'have.text',
			'0',
		);

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testChangeRelations('nobody', 'following');

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.getByTestId('SocialCard.cards.Following.number.title').should(
			'have.text',
			'1',
		);

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testChangeRelations('following', 'nobody');

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.getByTestId('SocialCard.cards.Following.number.title').should(
			'have.text',
			'0',
		);
	});

	it('Friend/Unfriend', function () {
		cy.setUserLocal(this.friendData);
		cy.reload();
		cy.getByTestId('ProfilePage', { timeout: 3000 });
		cy.testChangeRelations('nobody', 'following');

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.getByTestId('SocialCard.cards.Following.number.title').should(
			'have.text',
			'1',
		);

		cy.setUserLocal(this.userData);
		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.getByTestId('SocialCard.cards.Followers.number.title').should(
			'have.text',
			'1',
		);

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testChangeRelations('follower', 'friend');

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.getByTestId(`SocialCard.friends.${this.friendData.id}`).should('exist');

		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.testChangeRelations('friend', 'follower');

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.getByTestId(`SocialCard.friends.${this.friendData.id}`).should(
			'not.exist',
		);

		cy.setUserLocal(this.friendData);
		cy.visitPage('ProfilePage', getProfilePagePath(this.friendData.id));
		cy.getByTestId('SocialCard.cards.Following.number.title').should(
			'have.text',
			'1',
		);

		cy.visitPage('ProfilePage', getProfilePagePath(this.userData.id));
		cy.testChangeRelations('following', 'nobody');
	});
});
