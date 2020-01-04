// Capitalizes the first letter of a passed word
export const capitalize = word => {
	if (typeof word !== 'string') return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
};

// Returns first name
export const firstName = name => {
	return name.split(' ')[0];
};
