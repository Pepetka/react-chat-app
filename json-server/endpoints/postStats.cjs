const fs = require('fs');
const path = require('path');
const getPostStats = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const {
			'user-posts': userPosts = [],
			posts = [],
			'post-likes': postLikes = [],
			'post-dislikes': postDislikes = [],
			comments = [],
		} = db;

		const postLikesFromDb = postLikes.filter((like) => {
			return like.postId === String(postId);
		});

		const postDislikesFromDb = postDislikes.filter((dislike) => {
			return dislike.postId === String(postId);
		});

		const postCommentsFromDb = comments.filter((comment) => {
			return comment.postId === String(postId);
		});

		const postFromDb = posts.find((post) => post.id === String(postId));

		const postSharedFromDb = userPosts.filter((post) => {
			return (
				post.postId === String(postId) && postFromDb.authorId !== post.userId
			);
		});

		const response = {
			likes: String(postLikesFromDb.length),
			isLiked: Boolean(postLikesFromDb.find((like) => like.userId === userId)),
			dislikes: String(postDislikesFromDb.length),
			isDisliked: Boolean(
				postDislikesFromDb.find((dislike) => dislike.userId === userId),
			),
			comments: String(postCommentsFromDb.length),
			shared: String(postSharedFromDb.length),
			isShared: Boolean(
				postSharedFromDb.find((shared) => shared.userId === userId),
			),
		};

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getPostStats,
};
