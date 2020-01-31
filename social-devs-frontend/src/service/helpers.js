// Capitalizes the first letter of a passed word
export const capitalize = word => {
	if (typeof word !== 'string') return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
};

// Returns first name
export const firstName = name => {
	return name.split(' ')[0];
};

// Converts a skills array to skills string
export const createSkillsStr = skillsArr =>
	skillsArr.map((skill, i, arr) => {
		if (arr.length === 1 || arr.length === i + 1) {
			return skill;
		}

		if (arr.length >= 1) {
			return skill + ', ';
		}
	});

// Checks if an item is set
export const isSet = str =>
	str === undefined || null || '' ? 'Not set!' : str;
