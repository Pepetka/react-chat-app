const fs = require('fs');
const path = require('path');
const getFriends = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { friends = [], users = [] } = db;

		const friendsFromBd = friends
			.filter((friend) => {
				return friend.userId === userId || friend.friendId === userId;
			})
			.map((friend) => {
				const user = users.find((user) =>
					userId === friend.friendId
						? user.id === friend.userId
						: user.id === friend.friendId,
				);

				return {
					id: user.id,
					avatar: user.avatar,
					firstname: user.firstname,
					lastname: user.lastname,
				};
			});

		return res.json(friendsFromBd);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const postFriends = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, friendId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
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
			const newDb = JSON.stringify({
				...db,
				friends: friends.filter(
					(friend) =>
						friend.userId !== friendId && friend.friendId !== friendId,
				),
				followers: [
					...followers,
					{
						userId: userId,
						followerId: friendId,
						createdAt: new Date().toLocaleDateString(),
					},
				],
			});
			fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

			return res.status(200).json({ message: 'Now unfriend' });
		}

		const followersFromBd = followers.filter((follower) => {
			return follower.userId === userId;
		});

		if (followersFromBd.find((follower) => follower.followerId === friendId)) {
			const newDb = JSON.stringify({
				...db,
				friends: [
					...friends,
					{
						userId,
						friendId,
						createdAt: new Date().toLocaleDateString(),
					},
				],
				followers: followers.filter(
					(follower) => follower.followerId !== friendId,
				),
			});
			fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

			return res.status(200).json({ message: 'Now friends' });
		}

		const followingFromBd = followers.filter((follower) => {
			return follower.followerId === userId;
		});

		if (followingFromBd.find((follower) => follower.userId === friendId)) {
			const newDb = JSON.stringify({
				...db,
				followers: followers.filter((follower) => follower.userId !== friendId),
			});
			fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

			return res.status(200).json({ message: 'Now nobody' });
		}

		const newDb = JSON.stringify({
			...db,
			followers: [
				...followers,
				{
					userId: friendId,
					followerId: userId,
					createdAt: new Date().toLocaleDateString(),
				},
			],
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		return res.status(200).json({ message: 'Now following' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getFriends,
	postFriends,
};
