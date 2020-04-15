const isNumber = (n) => {
  if (!Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0)) {
    return parseInt(n, 10);
  }
  return n;
};
export default (data) => JSON.stringify(data, (key, value) => isNumber(value));
