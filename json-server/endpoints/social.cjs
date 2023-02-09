const fs = require('fs');
const path = require('path');
const getSocial = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'UTF-8'),
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
};

module.exports = {
	getSocial,
};
