/**
 * "Number of Boomerangs" Challenge
 * a boomerang can be defined as: sub-array of length 3,
 * with the first and last digits being the same and
 * the middle digit being different.
 *
 * @param {object} arr
 * @return {number} - the total number of boomerangs in an array.
 */
function countBoomerangs(arr) {
	return arr.slice(0, arr.length - 2)
    .filter((_, index) => {
      return new RegExp(/(-?\d)(?!\1)(-?\d)(?=\1)(-?\d)/gm).test(
        arr.slice(index, index + 3).join("")
      );
    }).length;
}

/**
 * "Words to Sentence" Challenge.
 * Create a function that turns an array of words into
 * a comma separated list, where the last word is
 * separated by the word "and".
 *
 * @param {*} words
 * @return {string}
 */
function wordsToSentence(words) {
  if (! words || words.every(e => ! Boolean(e)) || ! words.length) {
    return "";
  } else if (words.length == 1) {
    return words[0];
  }

  const meaningfulWords = words.filter(word => Boolean(word));
  const commaSeperatedWords = meaningfulWords
    .slice(1, meaningfulWords.length - 1)
    .reduce((acc, word) => `${acc}, ${word}`, meaningfulWords[0]);

  return `${commaSeperatedWords} and ${meaningfulWords[meaningfulWords.length - 1]}`;
}

/**
 * "Up the Hill, Down the Hill" Challenge
 * returns the average speed traveled given an uphill time,
 * uphill rate and a downhill rate. Uphill time is given in minutes.
 * Return the rate as an integer (mph). No rounding is necessary.
 *
 * @param {number} upTime
 * @param {number} upSpd
 * @param {number} downSpd
 * @return {number} - Average Speed
 */
function aveSpd(upTime, upSpd, downSpd) {
  const distanceCovered = (upTime/60) * upSpd * 2;
  const timeElapsed = (upTime/60) + (0.5 * distanceCovered / downSpd);

  return distanceCovered/timeElapsed;
}

/**
 * "The Missing Link" Challenge
 * Your function will get an array with a number sequence. However,
 * one item will be missing. It's your job to find out
 * which one is not in the array.
 *
 * @param {object} arr
 * @return {number}
 */
function missing(arr) {
  for(let i = 1; i < arr.length -1; i++) {
    const leftDiff = arr[i] - arr[i - 1];
    const rightDiff = arr[i+1] - arr[i];

    if (leftDiff > rightDiff) {
      return arr[i] - rightDiff;
    } else if (leftDiff < rightDiff) {
      return arr[i] + leftDiff;
    }
  }
}

/**
 * "Combinations" Challenge.
 * Create a function that takes a variable number of groups of items,
 * and returns the number of ways the items can be arranged,
 * with one item from each group. Order does not matter.
 *
 * @param {object} items
 * @return {number}
 */
function combinations(items) {
  return Array.from(arguments)
    .filter(arg => Boolean(arg))
    .reduce((acc, arg) => acc *= arg, 1);
}

/**
 * Calculate the length of a nested array.
 * "Length of a Nested Array" Challenge
 *
 * @param {object} arr
 * @return {number} - Total number of non-nested elements.
 */
function getLength(arr) {
  return arr.reduce((acc, currentItem) => acc + (Array.isArray(currentItem) ? getLength(currentItem): 1), 0)
}

/**
 * "How Many Days Between Two Dates" Challenge.
 * returns the number of days between the first and second date.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @return {number} - the number of days between the two dates.
 */
function getDays(date1, date2) {
  return (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
}

/**
 * "Numbers in Strings" Challenge.
 * Create a function that takes an array of strings and returns
 * an array with only the strings that have numbers in them.
 * If there are no strings containing numbers, return an empty array.
 *
 * @param {object} arr
 * @return {object} - array with only the strings that have numbers in them.
 */
function numInStr(arr) {
	return arr.filter(
		str => str.replace(/\d/g, "").length !== str.length
	)
}

/**
 * "Finding Common Elements" Challenge.
 * Create a function that takes two "sorted" arrays of numbers
 * and returns an array of numbers which are common to both the input arrays.
 *
 * @param {object} arr1
 * @param {object} arr2
 * @return {object} - array of common elements
 */
function commonElements(arr1, arr2) {
  const elementsOfFirstArray = new Set(arr1);

  return arr2.filter(secondArrElement => elementsOfFirstArray.has(secondArrElement));
}

/**
 * "Pandigital Numbers" Challenge.
 * A pandigital number contains all digits (0-9) at least once. Write a function that
 * takes an integer, returning true if the integer is pandigital, and false otherwise.
 *
 * @param {number} num
 * @return {boolean}
 */
function isPandigital(num) {
  const sumOfDigits = [...new Array(10)].map((_, index) => index).reduce((acc, val) => acc + val, 0);

  return [...new Set(num.toString().split("").map(Number))].reduce((acc, val) => acc + val, 0) == sumOfDigits;
}

/**
 * "Broken Keyboard" Challenge.
 * Broken keys should be ordered by when they first appear in the sentence.
 * Only one broken key per letter should be listed.
 * Letters will all be in lower case.
 *
 * @param {string} str1
 * @param {string} str2
 * @return {object} - array containing distinct/unique broken keys.
 */
function findBrokenKeys(str1, str2) {
  const typedLetters = str2.split("");
  const correctLetters = str1.split("");

  return [...new Set(correctLetters.filter((l, i) => l !== typedLetters[i]))];
}

/**
 * Do All Bigrams Exist?
 * Write a function that returns true if you
 * can find every single bigram from this array
 * can be found at least once in an array of words.
 *
 * @param {object} bigrams
 * @param {object} words
 * @return {boolean}
 */
function canFind(bigrams, words) {
  return bigrams.every(bigram => words.join("").indexOf(bigram) != -1);
}

/**
 * Positive Dominant
 * An array is positive dominant if it contains
 * strictly more unique positive values than unique negative values.
 *
 * @param {object} a
 * @returns {boolean} - if array contains more unique positives than negatives.
 */
function isPositiveDominant(a) {
  return [...new Set(a.filter(num => num > 0))].length > [...new Set(a.filter(num => num < 0))].length;
}

/**
 * LCM of Two Numbers
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number} - Least Common Multiple (LCM)
 */
function lcm(n1, n2) {
  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);

  if (max % min == 0) {
    return max;
  }

  for (let num = 1;;num++) {
    if (num % min == 0 && num % max == 0) {
      return num;
    }
  }
}

/**
 * Calculate the Total Price of Groceries.
 *
 * @param {object} groceries
 * @return {number} - Total Price of Groceries.
 */
function getTotalPrice(groceries) {
  const totalPrice = groceries.reduce((acc, grocery) => acc + grocery.quantity * grocery.price, 0);

  return Number(totalPrice.toFixed(1));
}

/**
 * Concatenate to Form Target Array
 * returns true if smaller arrays can concatenate to
 * form the target array and false otherwise.
 *
 * @param {object} arr
 * @param {object} target
 * @return {boolean}
 */
function canConcatenate(arr, target) {
  const concatenatedSmallerArrays = arr.reduce((acc, smallerArray) => [...acc, ...smallerArray], []);

  return concatenatedSmallerArrays.length === target.length &&
    concatenatedSmallerArrays.sort().every((val, index) => val === target.sort()[index]);
}

/**
 * Reversing a Binary String
 *
 * @param {number} num
 * @return {number}
 */
function reversedBinaryInteger(num) {
  return parseInt(num.toString(2).split("").reverse().join(""), 2);
}

/**
 * Rearrange the Sentence
 * Given a sentence with numbers representing a word's location
 * embedded within each word, return the sorted sentence.
 *
 * @param {string} sentence
 * @return {string}
 */
function rearrange(sentence) {
  return sentence.split(' ')
    .filter(Boolean)
    .sort((lhsWord, rhsWord) => {
      const locationOfLhsWord = Number(lhsWord.replace(/[^1-9]/g, '')) - 1;
      const locationOfRhsWord = Number(rhsWord.replace(/[^1-9]/g, '')) - 1;

      return locationOfLhsWord < locationOfRhsWord ? -1 : 1;
    })
    .map(word => word.replace(/[1-9]/g, ''))
    .join(' ');
}

/**
 * Product of Digits of Sum
 * Create a function that takes numbers as arguments, adds them together,
 * and returns the product of digits until the answer is only 1 digit long.
 *
 * @param  {...number} numbers
 * @return {number}
 */
function sumDigProd(...numbers) {
  let productOfDigits = numbers.reduce((acc, number) => acc + number , 0)
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc * digit, 1);

    while (productOfDigits % 10 != productOfDigits) {
      productOfDigits = productOfDigits.toString()
        .split('')
        .map(Number)
        .reduce((acc, digit) => acc * digit, 1);
    }

    return productOfDigits;
}

/**
 * "Number Pairs"
 * Create a function that determines how many number pairs are embedded
 * in a space-separated string. The first numeric value in the space-separated string
 * represents the count of the numbers, thus, excluded in the pairings.
 *
 * @param {string} str
 * @return {number}
 */
function numberPairs(str) {
  const seenNumbers = new Set();

  return str.split(' ').slice(1).map(num => +num).filter(num => {
    if (seenNumbers.has(num)) {
      seenNumbers.delete(num);
      return true;
    }

    seenNumbers.add(num);
    return false;
  }).length;
}

/**
 * Consecutive Numbers
 * Given an array of random digits of any length, return if
 * the number n appears times times in a row.
 *
 * @param {object} arr
 * @param {number} n
 * @param {number} times
 * @return {boolean}
 */
function isThereConsecutive(arr, n, times) {
  const regex = times > 0 ?
    new RegExp(`${n}{${times}}`):
    new RegExp(`[^${n}]`);

  return Boolean((arr.join('').match(regex) || []).length);
}

/**
 * Reverse the Odd Length Words
 * Given a string, reverse all the words which have
 * odd length. The even length words are not changed.
 *
 * @param {string} str
 * @return {string}
 */
function reverseOdd(str) {
  return str.split(' ').map(
    word => word.length % 2 == 0 ? word : [...word].reverse().join('')
  ).join(' ');
}

/**
 * Vowel to Vowel Links
 * Given a sentence as str, return true if any two adjacent words
 * have this property: One word ends with a vowel, while the word
 * immediately after begins with a vowel.
 *
 * @param {string} str
 * @return {boolean}
 */
function vowelLinks(str) {
  return new RegExp(/[aeiou]\s[aeiou]/gi).test(str);
}

/**
 * White Spaces Between Lower and Uppercase Letters.
 * Write a function that inserts a white space between every instance
 * of a lower character followed immediately by an upper character.
 *
 * @param {string} s
 * @return {string}
 */
function insertWhitespace(s) {
	return s.replace(/([a-z])([A-Z])/g, '$1 $2')
}

/**
 * Layers in a Rug
 * Write a function that counts how many concentric layers a rug.
 * https://edabit.com/challenge/8khL2WEhZ6M9onHL4
 *
 * @param {object} rug
 * @return {number}
 */
function countLayers(rug) {
	return new Set(rug).size;
}

/**
 * Get Students with Names and Top Notes.
 * https://edabit.com/challenge/GJD5x54NaFZwbtxQW
 *
 * @param {object} students
 * @return {object}
 */
function getStudentsWithNamesAndTopNotes(students) {
  return students.map(student => ({name: student.name, topNote: Math.max(...student.notes, 0)}));
}

/**
 * The Karaca's Encryption Algorithm.
 * Step 1: Reverse the input
 * Step 2: Replace all vowels using the following chart
 *
 * a => 0
 * e => 1
 * i => 2
 * o => 2
 * u => 3
 *
 * Step 3: Add "aca" to the end of the word
 *
 * @param {string} word
 * @return {string}
 */
function encrypt(word) {
  const vowels = ['a', 'e', 'o', 'u'];

  return [...word].reverse().join('')
    .replace(new RegExp(`[${vowels.join('')}]`, 'g'), (match) => vowels.indexOf(match))
    .replace(/(\w)$/, '$1aca');
}

/**
 * Check if input number is prime.
 * Complexity: O(sqrt(n))
 *
 * @param {number} num
 * @return {boolean}
 */
const isPrime = num => {
  for (let i = 2, sqrroot = Math.sqrt(num); i <= sqrroot; i++) {
    if (num % i == 0) {
      return false;
    }
  }

  return num > 1;
}

/**
 * No Good Numbers
 * A positive number's population is the number of 1s in its binary representation.
 * An evil number has an even numbered population,
 * whereas an odious number has an odd numbered population.
 * Moreover, a number is pernicious if its population is a prime number.
 * Create a function that takes a number as an argument and returns
 * a sorted array of all its descriptors ("Evil", "Odious", or "Pernicious").
 *
 * @param {number} num
 * @return {object} - Descriptors Array.
 */
function howBad(num) {
  const onesCount = Number(num).toString(2).match(/1/g).length;
  const descriptors = onesCount % 2 == 0 ? ['Evil'] : ['Odious'];

  return isPrime(onesCount) ? [...descriptors, 'Pernicious'] : descriptors;
}

/**
 * Sum of Missing Numbers
 * https://edabit.com/challenge/8a2J9T4FM5fgSwn4w
 * Create a function that returns the sum of missing numbers.
 *
 * @param {object} arr
 * @return {number}
 */
function sumMissingNumbers(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const sumOfExistingElements = arr.reduce((acc, val) => acc + val, 0);
  const sumOfElementsInRange = Array(max - min + 1).fill()
    .map((_, index) => min + index)
    .reduce((acc, val) => acc + val, 0);

  return sumOfElementsInRange - sumOfExistingElements;
}
