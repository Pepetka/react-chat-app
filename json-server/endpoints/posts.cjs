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
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { 'user-posts': userPosts = [], posts = [], users = [] } = db;

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
				const author = users.find((user) => user.id === post.authorId);

				return {
					...post,
					authorId: undefined,
					author: {
						id: author.id,
						avatar: author.avatar,
						firstname: author.firstname,
						lastname: author.lastname,
					},
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
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
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
		const { text, authorId, img, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { 'user-posts': userPosts = [], posts = [] } = db;

		const newPost = {
			authorId,
			text,
			img,
			createdAt: getCurrentDate(),
			id: crypto.randomUUID(),
		};

		const newUserPost = {
			userId,
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
