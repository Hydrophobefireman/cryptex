export function exportPromise({ promise }, cb) {
  return new Promise(resolve => promise().then(data => resolve(cb(data))));
}
