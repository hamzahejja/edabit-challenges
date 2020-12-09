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