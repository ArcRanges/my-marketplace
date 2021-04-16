const timeout = (func, delay, ...args) =>
  setTimeout(() => func(...args), delay);

export default timeout;
