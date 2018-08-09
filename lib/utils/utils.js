/* eslint no-param-reassign: 0 */

// Apply multiple filters to an array, capturing each result in the
// returned object's corresponding property
function shake(array, filters) {
  return Object.keys(filters).reduce((results, func) => {
    const newObj = {};
    newObj[func] = array.filter(filters[func]);
    return Object.assign(newObj, results);
  }, {});
}

function timestamp() {
  return new Date()
    .toISOString()
    .replace(/-|:|\.|T|Z/g, '')
    .slice(0, -3);
}

// Join two arrays while maintaining uniqueness
function join(arr1, arr2) {
  if (arr1 === undefined) return arr2;
  if (arr2 === undefined) return arr1;
  return arr1.concat(arr2.filter(el => !arr1.includes(el)));
}

// Assign all properties to an object, _merging_ values instead of replacing
// !Assumes each value in object is an Array
function mergeAssign(...sources) {
  sources.reduce((target, source) => {
    Object.keys(source).forEach((key) => {
      target[key] = join(target[key], source[key]);
    });
    return target;
  });
}

// Reverse-engineer a Regexp to find the "minimum" string to match
// !Not at all a complete solution, designed to the regular expressions
// !Express builds
function minimumMatch(regexp) {
  return String(regexp)
    // trim off regex literals
    .replace(/^\/|\/[^/]*$/g, '')
    // trim anchors
    .replace(/^\^|\$$/g, '')
    // unescape escaped backslashes
    .replace(/\\./g, match => match[1])
    // remove positive lookahead
    .replace(/\(\?=[^)]*\)$/, '')
    // remove optional characters
    .replace(/.\?/g, '');
}

// take a value that is either an array or undefined, and join
// that with a source to make a new array
function smartConcat(target, source) {
  if (target) return target.concat(source);
  return [source];
}

module.exports = {
  join,
  minimumMatch,
  mergeAssign,
  shake,
  smartConcat,
  timestamp
};
