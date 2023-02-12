const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');
const sortByDate = require('../helpers/sortByCreatedAt.cjs');

const getComments = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { comments = [], users = [] } = db;

		const commentsFromDb = comments
			.filter((comment) => {
				return comment.postId === String(postId);
			})
			.map((comment) => {
				const author = users.find((user) => user.id === comment.authorId);

				return {
					...comment,
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

		return res.json(commentsFromDb);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const putComments = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { commentId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { comments = [] } = db;

		const deleteComment = comments.find((comment) => {
			return comment.id === commentId;
		});

		const newComments = comments.filter((comment) => {
			return comment.id !== commentId;
		});

		const newDb = JSON.stringify({
			...db,
			comments: newComments,
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(deleteComment);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const postComments = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { authorId, text, postId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { comments = [] } = db;

		const newComment = {
			id: crypto.randomUUID(),
			text,
			authorId,
			postId,
			createdAt: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toLocaleDateString()}`,
		};

		const newDb = JSON.stringify({
			...db,
			comments: [...comments, newComment],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(newComment);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getComments,
	putComments,
	postComments,
};
