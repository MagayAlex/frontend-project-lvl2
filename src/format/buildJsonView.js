const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0) ? parseInt(n) : n;

export default (data) => {
	return JSON.stringify(data, (key, value) => isNumber(value));
};
