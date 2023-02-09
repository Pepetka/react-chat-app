const fs = require('fs');
const path = require('path');
const getRelations = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, friendId } = req.query;

		if (userId === friendId) {
			return res.json({ relations: 'nobody' });
		}

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { friends = [], followers = [] } = db;

		const friendsFromBd = friends.filter((friend) => {
			return friend.userId === userId || friend.friendId === userId;
		});

		if (
			friendsFromBd.find(
				(friend) => friend.userId === friendId || friend.friendId === friendId,
			)
		) {
			return res.json({ relations: 'friend' });
		}

		const followersFromBd = followers.filter((follower) => {
			return follower.userId === userId || follower.followerId === userId;
		});

		if (followersFromBd.find((follower) => follower.followerId === friendId)) {
			return res.json({ relations: 'follower' });
		}

		if (followersFromBd.find((follower) => follower.userId === friendId)) {
			return res.json({ relations: 'following' });
		}

		return res.json({ relations: 'nobody' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getRelations,
};
