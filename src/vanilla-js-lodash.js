/**
 * _.find (collection, predicate, startIndex)
 *  Iterates over elements of collection, returning the first element predicate returns truthy for.
 *  The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @param {object} collection - (Array or Object): The collection to inspect.
 * @param {function|object|string} predicate - _.identity function, object, array or string.
 * @param {number} startIndex - The index to search from.
 *
 * @return {object}
 */
const find = (collection, predicate, startIndex) => {
  const searchCollection = Array.isArray(collection) ? collection : Object.values(collection);

  if (typeof(predicate) === 'object') {
    return Array.isArray(predicate) ?
      findByArrayLikePredicate(searchCollection, predicate, startIndex):
      findByObjectLikePredicate(searchCollection, predicate, startIndex);
  } else if (typeof(predicate) === 'function') {
    return findByFunctionPredicate(searchCollection, predicate, startIndex);
  } else {
    return findByStringLikePredicate(searchCollection, predicate, startIndex);
  }
}

const findByFunctionPredicate = (collection, predicate, startIndex) => {
  return Array.isArray(collection) ?
    collection.slice(startIndex).filter(predicate)[0]:
    Object.values(collection).slice(startIndex).filter(predicate)[0];
}

const findByObjectLikePredicate = (collection, predicate, startIndex) => {
  const conditions = Object.entries(predicate);

  return collection.slice(startIndex).filter(o => {
    return conditions.every(condition => {
      const [key, value] = condition;
      return o[key] === value;
    });
  })[0];
}

const findByArrayLikePredicate = (collection, predicate, startIndex) => {
  const conditions = Array.from({length: predicate.length / 2}, (_, i) => i * 2)
    .map(keyIndex => [predicate[keyIndex], predicate[keyIndex + 1]]);

  return collection.slice(startIndex).filter(o => {
    return conditions.every(condition => {
      const [key, value] = condition;
      return o[key] === value;
    });
  })[0];
}

const findByStringLikePredicate = (collection, predicate, startIndex) => {
  return collection.slice(startIndex).filter(o => o[predicate])[0];
}

/**
 * According to the lodash documentation, _.difference(array, [values]) creates an array of array values
 * not included in the other given arrays using SameValueZero for equality comparisons.
 * The order and references of result values are determined by the first array.

 * @param {Array} array - The array to inspect.
 * @param  {...Array} arrays - The any number of arrays containing the values to exclude
 * @return {Array} - Returns the new array of filtered values
 */
const difference = (array, ...arrays) => {
	const excludedValues = arrays.flat();
  return array.filter(val => ! excludedValues.includes(val));
}

/**
 * According to the lodash documentation,
 * _.pull Removes all given values from array using SameValueZero for equality comparisons.
 * Note that unlike _.without, this method mutates array.
 * @param {Array} arr
 * @param  {...any} args
 */
const pull = (arr, ...args) => {
  let index = 0;
  while(index < arr.length) {
    if (args.includes(arr[index])) {
      arr.splice(index, 1);
    } else {
      index++;
    }
  }

  return arr;
}

/**
 * According to the lodash documentation,
 * _.dropwWhile Creates a slice of array excluding elements dropped from the beginning.
 * Elements are dropped until the predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 * The documents state that if, instead of passing a function to dropwhile, you pass an object.
 *  It knows to convert that to the "matches" function.
 *
 * @param {Array} arr
 * @param {function|object} fn
 */
const dropWhile = (arr, fn) => {
  return typeof(fn) === 'function' ?
    arr.slice(arr.findIndex(v => !fn(v))):
    arr.slice(arr.findIndex(v => !buildObjectLikePredicate(v, fn)));
}

/**
 * Build condition with object-like predicate,
 * instead of passing a function as predicate for dropWhile
 *
 * @param {object} obj
 * @param {object} predicateFn
 */
const buildObjectLikePredicate = (obj, predicateFn) => {
  return Object.entries(predicateFn).every(([key, value]) => obj[key] === value);
}
