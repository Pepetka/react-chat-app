const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const crypto = require('node:crypto');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
	await new Promise((res) => {
		setTimeout(res, 800);
	});
	next();
});

server.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
		);
		const { users = [] } = db;
		let wrongPass = false;

		const userFromBd = users.find((user) => {
			if (user.username === username && user.password !== password) {
				wrongPass = true;
			}

			return user.username === username && user.password === password;
		});

		if (userFromBd) {
			return res.json({ ...userFromBd, password: undefined });
		}

		if (wrongPass) {
			return res.status(403).json({ message: 'Wrong password' });
		}

		return res.status(403).json({ message: 'User not found' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/register', (req, res) => {
	try {
		const { username, password, firstname, lastname, age, email } = req.body;
		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
		);
		const { users = [] } = db;

		const existedUser = users.find((user) => {
			return user.username === username;
		});

		if (existedUser) {
			return res
				.status(403)
				.json({ message: 'User with this username already exists' });
		}

		const date = new Date().toLocaleDateString();

		const newUsers = [
			...users,
			{
				username: username,
				password: password,
				id: crypto.randomUUID(),
				firstname: firstname,
				lastname: lastname,
				email: email,
				age: age,
				createdAt: date,
				avatar:
					'https://miro.medium.com/max/2400/1*1WCjO1iYMo7J7Upp8KMfLA@2x.jpeg',
			},
		];

		const newDb = JSON.stringify({ ...db, users: newUsers });

		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		const userFromBd = newUsers.find((user) => {
			return user.username === username && user.password === password;
		});

		return res.json({ ...userFromBd, password: undefined });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/social', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
		);
		const { followers = [], 'group-members': groupMembers = [] } = db;

		const followersFromBd = followers.filter((follower) => {
			return follower.userId === userId;
		});

		const followingFromBd = followers.filter((follower) => {
			return follower.followerId === userId;
		});

		const groupsFromBd = groupMembers.filter((group) => {
			return group.userId === userId;
		});

		return res.json({
			followersNum: String(followersFromBd.length),
			followingNum: String(followingFromBd.length),
			groupsNum: String(groupsFromBd.length),
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/friends', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
		);
		const { friends = [], users = [] } = db;

		const friendsFromBd = friends
			.filter((friend) => {
				return friend.userId === userId || friend.friendId === userId;
			})
			.map((friend) => {
				return users.find((user) =>
					userId === friend.friendId
						? user.id === friend.userId
						: user.id === friend.friendId,
				);
			});

		return res.json(friendsFromBd);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/friends', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, friendId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
			fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

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
			fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

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
			fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.status(200).json({ message: 'Now following' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/relations', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, friendId } = req.query;

		if (userId === friendId) {
			return res.json('nobody');
		}

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
			return res.json('friend');
		}

		const followersFromBd = followers.filter((follower) => {
			return follower.userId === userId || follower.followerId === userId;
		});

		if (followersFromBd.find((follower) => follower.followerId === friendId)) {
			return res.json('follower');
		}

		if (followersFromBd.find((follower) => follower.userId === friendId)) {
			return res.json('following');
		}

		return res.json('nobody');
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	next();
});

server.use(router);

server.listen(8000, () => {
	console.log('server is running on 8000 port');
});
