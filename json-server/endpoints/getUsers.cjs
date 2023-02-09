const fs = require('fs');
const path = require('path');
const getContains = require('../helpers/getContains.cjs');

const searchFilter =
	(search) =>
	({ firstname, lastname }) => {
		return getContains(`${firstname} ${lastname}`, search);
	};

const getUsers = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, search = '' } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
		);
		const { friends = [], followers = [], users = [] } = db;

		const friendsFromDb = friends.filter((friend) => {
			return friend.userId === userId || friend.friendId === userId;
		});

		const followersFromDb = followers.filter((follower) => {
			return follower.userId === userId;
		});

		const followingFromDb = followers.filter((follower) => {
			return follower.followerId === userId;
		});

		const Friends = friendsFromDb
			.map((friend) => {
				let currentId;

				if (friend.userId === userId) {
					currentId = friend.friendId;
				} else {
					currentId = friend.userId;
				}

				const user = users.find((user) => user.id === currentId);

				const { id, avatar, firstname, lastname } = user;

				return { id, avatar, firstname, lastname };
			})
			.filter(searchFilter(search));

		const Followers = followersFromDb
			.map((follower) => {
				const user = users.find((user) => user.id === follower.followerId);

				const { id, avatar, firstname, lastname } = user;

				return { id, avatar, firstname, lastname };
			})
			.filter(searchFilter(search));

		const Following = followingFromDb
			.map((follower) => {
				const user = users.find((user) => user.id === follower.userId);

				const { id, avatar, firstname, lastname } = user;

				return { id, avatar, firstname, lastname };
			})
			.filter(searchFilter(search));

		const Others = users
			.filter((user) => {
				return (
					userId !== user.id &&
					!friendsFromDb.find(
						(friend) =>
							friend.userId === user.id || friend.friendId === user.id,
					) &&
					!followersFromDb.find(
						(follower) => follower.followerId === user.id,
					) &&
					!followingFromDb.find((follower) => follower.userId === user.id)
				);
			})
			.map(({ id, avatar, firstname, lastname }) => {
				return { id, avatar, firstname, lastname };
			})
			.filter(searchFilter(search));

		const response = {
			Followers: Followers.length === 0 ? undefined : Followers,
			Following: Following.length === 0 ? undefined : Following,
			Friends: Friends.length === 0 ? undefined : Friends,
			Others: Others.length === 0 ? undefined : Others,
		};

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = getUsers;
