const fs = require('fs');
const path = require('path');

const timerId = {};

const getOnline = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { online = {} } = db;

		const response = online[userId] ?? 'offline';

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const postOnline = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.body;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { online = {} } = db;

		clearTimeout(timerId[userId]);

		const newDb = JSON.stringify({
			...db,
			online: {
				...online,
				[userId]: 'online',
			},
		});
		fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);

		timerId[userId] = setTimeout(() => {
			const newDb = JSON.stringify({
				...db,
				online: {
					...online,
					[userId]: 'offline',
				},
			});

			fs.writeFileSync(path.resolve(__dirname, '..', 'db.json'), newDb);
		}, 10000);

		return res.json('online');
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = {
	getOnline,
	postOnline,
};
