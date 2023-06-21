const fs = require('fs');
const path = require('path');
const like = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { 'post-likes': postLikes = [], 'post-dislikes': postDislikes = [] } =
			db;

		const newPostLikes = {
			userId,
			postId: postId,
		};

		const postLikesFromDb = postLikes.filter((like) => {
			return !(like.userId === userId && like.postId === String(postId));
		});

		const postDislikesFromDb = postDislikes.filter((dislike) => {
			return dislike.postId !== String(postId) && dislike.userId !== userId;
		});

		const newDb = JSON.stringify({
			...db,
			'post-likes':
				postLikesFromDb.length < postLikes.length
					? [...postLikesFromDb]
					: [...postLikes, newPostLikes],
			'post-dislikes': [...postDislikesFromDb],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(newPostLikes);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = like;
