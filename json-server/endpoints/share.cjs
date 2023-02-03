const fs = require('fs');
const path = require('path');
const share = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { 'user-posts': userPosts = [] } = db;

		const userPostFromDb = userPosts.find((post) => {
			return post.userId === userId && post.postId === String(postId);
		});

		const newUserPost = {
			userId,
			postId: postId,
		};

		const newDb = JSON.stringify({
			...db,
			'user-posts': userPostFromDb
				? [...userPosts]
				: [...userPosts, newUserPost],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.json(newUserPost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = share;
