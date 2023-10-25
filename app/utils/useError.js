/**
 * Wrap a non-error request handler with the error handler
 * @param {Function} fn A request handler
 * @returns A callback function that return a promise
 */
const useError = (fn) => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = useError;
