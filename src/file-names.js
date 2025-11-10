const { NotImplementedError } = require('../lib');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  let used = new Set();
  let counters = {};
  let result = [];

  for (let name of names) {
    if (!used.has(name)) {
      result.push(name);
      used.add(name);
      counters[name] = 1;
    } else {
      let k = counters[name] || 1;
      let newName = `${name}(${k})`;

      while (used.has(newName)) {
        k += 1;
        newName = `${name}(${k})`;
      }

      result.push(newName);
      used.add(newName);
      counters[name] = k + 1;
    }
  }
  return result;
}

module.exports = {
  renameFiles
};
