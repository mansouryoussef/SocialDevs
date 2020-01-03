// capitalizes the first letter of a passed word
export const capitalize = word => {
	if (typeof word !== 'string') return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
};
// returns first name
export const firstName = name => {
	return name.split(' ')[0];
};
