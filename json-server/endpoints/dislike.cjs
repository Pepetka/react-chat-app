const fs = require('fs');
const path = require('path');
const dislike = (req, res) => {
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

		const newPostDislikes = {
			userId,
			postId: postId,
		};

		const postDislikesFromDb = postDislikes.filter((dislike) => {
			return !(dislike.userId === userId && dislike.postId === String(postId));
		});

		const postLikesFromDb = postLikes.filter((like) => {
			return like.postId !== String(postId) && like.userId !== userId;
		});

		const newDb = JSON.stringify({
			...db,
			'post-likes': [...postLikesFromDb],
			'post-dislikes':
				postDislikesFromDb.length < postDislikes.length
					? [...postDislikesFromDb]
					: [...postDislikes, newPostDislikes],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(newPostDislikes);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = dislike;
