const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');
const sortByDate = require('../helpers/sortByCreatedAt.cjs');
const getCurrentDate = require('../helpers/getCurrentDate.cjs');

const getPosts = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const {
			'user-posts': userPosts = [],
			posts = [],
			users = [],
			groups = [],
		} = db;

		const userPostsFromBd = userPosts
			.filter((post) => {
				return post.userId === userId;
			})
			.map(({ postId }) => postId);

		const postsFromBd = posts
			.filter((post) => {
				return userPostsFromBd.includes(post.id);
			})
			.map((post) => {
				let authorData = users.find((user) => user.id === post.authorId);
				let author;

				if (!authorData) {
					authorData = groups.find((group) => group.id === post.authorId);
					author = {
						id: authorData.id,
						avatar: authorData.avatar,
						name: authorData.name,
					};
				} else {
					author = {
						id: authorData.id,
						avatar: authorData.avatar,
						name: `${authorData.firstname} ${authorData.lastname}`,
					};
				}

				return {
					...post,
					authorId: undefined,
					author,
				};
			})
			.sort(sortByDate);

		return res.json(postsFromBd);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const putPosts = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { 'user-posts': userPosts = [], posts = [] } = db;

		const deletePost = posts.filter((post) => {
			return post.id === postId;
		});

		const userPostsFromBd = userPosts.filter((post) => {
			return post.postId === postId;
		});

		const newUserPosts = userPosts.filter(
			(post) => !(post.postId === postId && post.userId === userId),
		);

		let newPosts = posts;

		if (userPostsFromBd.length === 1) {
			newPosts = newPosts.filter((post) => post.id !== postId);
		}

		const newDb = JSON.stringify({
			...db,
			posts: newPosts,
			'user-posts': newUserPosts,
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(deletePost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const postPosts = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { text, authorId, img, profileId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const {
			'user-posts': userPosts = [],
			posts = [],
			'group-members': groupMembers = [],
		} = db;

		const groupMember = groupMembers.find((member) => {
			return member.userId === authorId && member.groupId === profileId;
		});

		const newPost = {
			authorId: groupMember ? groupMember.groupId : authorId,
			text,
			img,
			createdAt: getCurrentDate(),
			id: crypto.randomUUID(),
		};

		const newUserPost = {
			userId: profileId,
			postId: newPost.id,
		};

		const newDb = JSON.stringify({
			...db,
			posts: [...posts, newPost],
			'user-posts': [...userPosts, newUserPost],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(newPost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getPosts,
	putPosts,
	postPosts,
};
