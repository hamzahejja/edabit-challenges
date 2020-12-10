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

/**
 * According to the lodash documentation,
 * _.drop creates a slice of an array with n elements dropped from the beginning.
 *
 * @param {Array} arr
 * @param {Number} val
 * @return {Array}
 */
const drop = (arr, val = 1) => arr.slice(val);

/**
 * According to the lodash documentation,
 *  _.differenceBy is like _.difference except that it accepts iteratee which is invoked for each element of array and
 * values to generate the criterion by which they're compared. The order and references of result values are determined
 * by the first array. The iteratee is invoked with one argument:
 * The iteratee can be a function or a value.
 *
 * @param {Array} array - The array to inspect
 * @param  {Array} values - The number of arrays containing the values to exclude.
 * @return {Array} - Returns the new array of filtered values.
 */
const differenceBy = (array, ...values) => {
  const iterateeInvokedPerElement = values.pop();

  return typeof(iterateeInvokedPerElement) === 'function' ?
    differenceByWithFunctionIteratee(array, values, iterateeInvokedPerElement):
    differenceByWithPropertyIteratee(array, values, iterateeInvokedPerElement);
}

/**
 * differenceBy with value/property iteratee.
 *
 * @param {Array} array - The array to inspect
 * @param {Array} values - the number of arrays containing values to exclude.
 * @param {string} iteratee - invoked per element and user for comparison/filtering
 * @return {Array} - the new array of filtered elements.
 */
const differenceByWithPropertyIteratee = (array, values, iteratee) => {
  return array.filter(element => {
    return ![...values.flat()].some(o => o[iteratee] === element[iteratee]);
  });
}

/**
 * differenceBy with function iteratee.
 *
 * @param {Array} array - The array to inspect
 * @param {Array} values - the number of arrays containing values to exclude.
 * @param {string} iteratee - invoked per element and user for comparison/filtering.
 * @return {Array} - the new array of filtered elements.
 */
const differenceByWithFunctionIteratee = (array, values, iterateeFn) => {
  return array.filter(element => {
    return iterateeFn(element) &&
      [...values.flat()].filter(val => iterateeFn(val)).length === 0;
  })
}

/**
 * Write a function that creates an array of values found within all given arrays.
 * The first array will serve as the base from which the remaining arrays will be checked to see if they have the matching values.
 * If they do they will be added to the new array which will return only unique values showing the "intersecting" values of all arrays.
 *
 * @param  {Array} a
 * @return {Array} - Array of only unique values showing the "intersection" values of all arrays.
 */
const intersection = (...a) => {
  const [baseArray, ...remainingArrays] = a;

  return baseArray.filter(element => {
    return remainingArrays.every(subArr => subArr.some(subElement => isSimilar(element, subElement)));
  })
}

/**
 * Compare values and check if similar.
 *
 * @param {any} val1
 * @param {any} val2
 */
const isSimilar = (val1, val2) => {
  return typeof(val1 === 'object' && typeof(val2) === 'object') ?
    JSON.stringify(val1) === JSON.stringify(val2):
    val1 === val2;
}
