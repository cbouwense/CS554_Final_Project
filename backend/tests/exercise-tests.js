const Exercise = require('../built/models/exercise');

const e = new Exercise({
	name: "cbouwense",
	description: "bepis",
	images: [
		"url_one",
		"url_two",
		"url_three"
	],
	bodyparts_worked: [
		"part_one",
		"part_two",
		"part_three"
	],
	equipment: [
		"equip_one",
		"equip_two",
		"equip_three"
	]
});

e.save((err) => {
	if (err) console.error("bepis" + err);
	console.log('ladies and gentlement, we got em');
});