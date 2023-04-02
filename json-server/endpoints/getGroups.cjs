const fs = require('fs');
const path = require('path');
const getContains = require('../helpers/getContains.cjs');
const sortByDate = require('../helpers/sortByCreatedAt.cjs');

const searchFilter = (search) => (el) => {
	return getContains(el.name, search);
};

const getGroups = (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	try {
		const { userId, search = '' } = req.query;

		const db = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '..', 'db.json'), 'utf8'),
		);
		const { groups = [], 'group-members': groupMembers = [] } = db;

		const response = groupMembers
			.filter((group) => {
				return group.userId === userId;
			})
			.map((currentGroup) => {
				const groupId = currentGroup.groupId;

				const groupData = groups.find((group) => {
					return group.id === groupId;
				});

				return {
					...groupData,
					createdAt: groupData.createdAt.split(' ')[1],
				};
			})
			.filter(searchFilter(search))
			.sort(sortByDate);

		return res.json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

module.exports = getGroups;
