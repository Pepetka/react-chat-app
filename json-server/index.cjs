const jsonServer = require('json-server');
const path = require('path');
const auth = require('./endpoints/auth.cjs');
const social = require('./endpoints/social.cjs');
const friends = require('./endpoints/friends.cjs');
const relations = require('./endpoints/relations.cjs');
const posts = require('./endpoints/posts.cjs');
const postStats = require('./endpoints/postStats.cjs');
const share = require('./endpoints/share.cjs');
const like = require('./endpoints/like.cjs');
const dislike = require('./endpoints/dislike.cjs');
const comments = require('./endpoints/comments.cjs');
const getUsers = require('./endpoints/getUsers.cjs');
const getChats = require('./endpoints/getChats.cjs');
const messages = require('./endpoints/messages.cjs');

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

server.post('/login', auth.login);
server.post('/register', auth.register);
server.get('/social', social.getSocial);
server.get('/friends', friends.getFriends);
server.post('/friends', friends.postFriends);
server.get('/relations', relations.getRelations);
server.get('/posts', posts.getPosts);
server.put('/posts', posts.putPosts);
server.post('/posts', posts.postPosts);
server.get('/postStats', postStats.getPostStats);
server.post('/share', share);
server.post('/like', like);
server.post('/dislike', dislike);
server.get('/comments', comments.getComments);
server.put('/comments', comments.putComments);
server.post('/comments', comments.postComments);
server.get('/getUsers', getUsers);
server.get('/getChats', getChats);
server.get('/messages', messages.getMessages);
server.post('/messages', messages.postMessages);

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
