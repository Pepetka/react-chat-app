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
