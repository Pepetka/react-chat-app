const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');
const login = (req, res) => {
	try {
		const { username, password } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
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
};

const register = (req, res) => {
	try {
		const { username, password, firstname, lastname, age, email } = req.body;
		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
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

		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		const userFromBd = newUsers.find((user) => {
			return user.username === username && user.password === password;
		});

		return res.json({ ...userFromBd, password: undefined });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	login,
	register,
};
