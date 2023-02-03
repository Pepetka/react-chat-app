const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const crypto = require('node:crypto');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const sortByDate = (prevPost, nextPost) => {
	const prevDate = new Date(
		`${prevPost.createdAt.split(' ')[0]} ${prevPost.createdAt
			.split(' ')[1]
			.split('.')
			.reverse()
			.join('.')}`,
	).getTime();
	const nextDate = new Date(
		`${nextPost.createdAt.split(' ')[0]} ${nextPost.createdAt
			.split(' ')[1]
			.split('.')
			.reverse()
			.join('.')}`,
	).getTime();

	return nextDate - prevDate;
};

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
			return res.json({ relations: 'nobody' });
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
});

server.get('/posts', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
					author,
				};
			})
			.sort(sortByDate);

		return res.json(postsFromBd);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.put('/posts', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(deletePost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/posts', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { text, authorId, img, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
		);
		const { 'user-posts': userPosts = [], posts = [] } = db;

		const newPost = {
			authorId,
			text,
			img,
			createdAt: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toLocaleDateString()}`,
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(newPost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/postStats', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
});

server.post('/share', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(newUserPost);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/like', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(newPostLikes);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/dislike', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId, userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(newPostDislikes);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.get('/comments', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { postId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
					author,
				};
			})
			.sort(sortByDate);

		return res.json(commentsFromDb);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.put('/comments', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { commentId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(deleteComment);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.post('/comments', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { authorId, text, postId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
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
		fs.writeFileSync(path.resolve(__dirname, 'db.json'), newDb);

		return res.json(newComment);
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
