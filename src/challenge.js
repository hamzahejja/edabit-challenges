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

/**
 * Distance to Nearest Vowel
 * https://edabit.com/challenge/b9FBAhxaijR9fzxgo
 *
 * @param {string} str
 * @return {object}
 */
function distanceToNearestVowel(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const indicesOfVowels = [...str].reduce((indices, char, index) => vowels.includes(char) ? [...indices, index] : indices, []);

  return [...str].map((_, currentIndex) =>  indicesOfVowels.includes(currentIndex) ?
    0 : Math.min(...indicesOfVowels.map(vowelIndex => Math.abs(vowelIndex - currentIndex)))
  );
}

/**
 * Count the Countdown Sequences
 * https://edabit.com/challenge/HW4ZzYmDaASKfwdq6
 *
 * @param {object} arr
 * @return {object} - of the form [numberOfCountdownSequences, countdownSequences]
 */
function finalCountdown(arr) {
  let allCountdownSequences = [];
  let currentCountdownElements = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 1) {
      allCountdownSequences.push([...currentCountdownElements, 1]);
      currentCountdownElements = [];
    } else if (arr[i + 1] == arr[i] - 1) {
      currentCountdownElements.push(arr[i]);
    } else {
      currentCountdownElements = [];
    }
  }

  return [allCountdownSequences.length, allCountdownSequences];
}

/**
 * Create a function that returns the characters from an array or string r on
 * odd or even positions, depending on the specifier s. The specifier will be
 * "odd" for items on odd positions (1, 3, 5, ...) and
 * "even" for items on even positions (2, 4, 6, ...).
 * https://edabit.com/challenge/fWkrdJb6EJrHsP7Sm
 * @param {object|string} r
 * @param {object|string} s
 * @return {object|string}
 */
function charAtPos(r, s) {
  return typeof(r) == 'string' ?
    [...r].filter((_, index) => s === 'even' ? (index + 1) % 2 == 0 : (index + 1) % 2 != 0).join(''):
    [...r].filter((_, index) => s === 'even' ? (index + 1) % 2 == 0 : (index + 1) % 2 != 0);
}

/**
 * Oddly or Evenly Positioned From Last.
 * Create a function that extracts the characters from an array (or a string)
 * on odd or even positions, depending on the specifier. The string "odd" for items on odd positions
 * (... 5, 3, 1) and "even" for even positions (... 6, 4, 2) from the last item of that array or string.
 *
 * @param {object|string} r
 * @param {object|string} s
 * @return {object|string}
 */
function oddlyOrEvenlyPositionedFromLast(r, s) {
  const extractedElements = [...r].filter(
    (_, index, arr) => s === 'even' ? (arr.length - index) % 2 == 0 : (arr.length - index) % 2 != 0
  );

  return typeof(r) == 'string' ? extractedElements.join('') : extractedElements;
}

/**
 * Knights on a Board.
 * Write a function that returns true if the knights are placed on a chessboard such that no knight
 * can capture another knight. Here, 0s represent empty squares and 1s represent knights.
 *
 * @param {object} board
 * @return {boolean}
 */
function cannotCapture(board) {
	const indicesOfKnights = board.reduce((indices, row, currentIndex) => {
    const onesIndices = row.reduce((acc, piece, index) => piece == 1 ? [...acc, [currentIndex, index]]: acc, []);
    return [...indices, ...onesIndices];
  }, []);

  return indicesOfKnights.every(knightIndex => {
    const [rowIndex, colIndex] = knightIndex;
    const cannotCaptureMovingVerticallyThenHorizontally = !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex - 2 && indexArr[1] == colIndex - 1) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex - 2 && indexArr[1] == colIndex + 1) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex + 2 && indexArr[1] == colIndex - 1) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex + 2 && indexArr[1] == colIndex + 1);

    const cannotCaptureMovingHorizontallyThenVertically = !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex - 1 && indexArr[1] == colIndex - 2) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex + 1 && indexArr[1] == colIndex - 2) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex - 1 && indexArr[1] == colIndex + 2) &&
      !indicesOfKnights.some(indexArr => indexArr[0] == rowIndex + 1 && indexArr[1] == colIndex + 2);

    return cannotCaptureMovingVerticallyThenHorizontally && cannotCaptureMovingHorizontallyThenVertically;
  })
}


/**
 * Generate 3-Letter Code from Surname.
 *
 * @param {string} surname
 * @return {string}
 */
function generateCodeFromSurname(surname) {
  const vowels = String(surname).replace(/[^aeiou]/gi, '');
  const consonants = String(surname).replace(/[aeiou]/gi, '');

  if (consonants.length >= 3) {
    return consonants.substr(0, 3).toUpperCase();
  } else {
    return (consonants.length + vowels.length >= 3) ?
      `${consonants}${vowels}`.substr(0, 3).toUpperCase() :
      `${consonants}${vowels}${Array(3 - (consonants.length + vowels.length)).fill('X').join('')}`.toUpperCase();
  }
}

/**
 * Generate 3 Capital Letters from Name.
 *
 * @param {string} name
 * @return {string}
 */
function generateCodeFromName(name) {
  const vowels = name.replace(/[^aeiou]/gi, '');
  const consonants = name.replace(/[aeiou]/gi, '');

  if (consonants.length > 3) {
    return `${consonants[0]}${consonants[2]}${consonants[3]}`.toUpperCase();
  }

  if (consonants.length == 3) {
    return consonants.toUpperCase();
  }

  if (consonants.length < 3) {
    return name.length < 3 ?
      `${consonants}${vowels}${Array(3 - (consonants.length + vowels.length)).fill('x').join('')}`.toUpperCase() :
      `${consonants}${vowels}`.substr(0, 3).toUpperCase();
  }
}

/**
 * Genereate 2 Numbers, 1 Letter and 2 Number from
 * Date of Birth + Gender of Person.
 *
 * @param {string} dateOfBirth
 * @param {string} gender
 * @return {string}
 */
function generateCodeFromDobAndGender(dateOfBirth, gender) {
  const monthsToLetterMapping = {
    1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
    7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
  };

  const [day, month, year] = dateOfBirth.split('/');

  const dayMapping = gender === 'F' ?
    (Number(day) + 40).toString() :
    (Number(day) < 10) ? `0${day}` : day;

    return `${year.slice(-2)}${monthsToLetterMapping[month]}${dayMapping}`;
}


function fiscalCode(person) {
  return `${generateCodeFromSurname(person.surname)}${generateCodeFromName(person.name)}${generateCodeFromDobAndGender(person.dob, person.gender)}`;
}

/**
 * Prison Break.
 * Starting from the leftmost cell, you are tasked with seeing how many prisoners you can
 * set free, with a catch. Each time you free a prisoner, the locked cells become unlocked, and the unlocked cells become locked again.
 * Create a function that, given this unique prison arrangement, returns the number of freed prisoners.
 *
 * @param {object} prison
 * @return {number}
 */
function freedPrisoners(prison) {
  let numberOfFreedPrisoners = 0;
  let remainingCellsBinary = Array.from(prison).join('');
  let indexOfNextUnlockedCell = remainingCellsBinary.indexOf('1');

  if (new RegExp(`01{${remainingCellsBinary.length - 1}}`).test(remainingCellsBinary)) return 0;

  while (indexOfNextUnlockedCell != -1 && indexOfNextUnlockedCell < remainingCellsBinary.length) {
    numberOfFreedPrisoners++;
    remainingCellsBinary = remainingCellsBinary.split('')
      .map(cell => 1 - Number(cell))
      .join('')
      .slice(indexOfNextUnlockedCell + 1);

    indexOfNextUnlockedCell = remainingCellsBinary.indexOf('1');
  }

  return numberOfFreedPrisoners;
}

/**
 * Find All Digits
 * Taking each four digit number of an array in turn, return the number that you are on
 * when all of the digits 0-9 have been discovered. If not all of the digits can be found, return "Missing digits!".
 *
 * @param {object} nums
 * @return {number}
 */
function findAllDigits(nums) {
  let foundDigits = new Set();

  for (let number of nums) {
    for (let digit of [...String(number)]) {
      foundDigits.add(digit);
      if (foundDigits.size == 10) return number;
    }
  }

  return `Missing digits!`;
}

/**
 * Valid Name
 * A term is either an initials or word.
 * initials = 1 character.
 * words = 2+ characters (no dots allowed).
 * Both initials and words must be capitalized.
 * Initials must end with a dot.
 * A name must be either 2 or 3 terms long.
 * If the name is 3 words long, you can expand the first and middle name or expand the first name only.
 * The last name must be a word (not an initial).
 *
 * @param {string} name
 * @return {string}
 */
function validName(name) {
  const initialsRegex = new RegExp("^[A-Z]\.$", "g");
  const wordRegex = new RegExp("^[A-Z][a-zA-Z]+$", "g");
  const terms = String(name).split(' ');

  if (terms.length == 3 && initialsRegex.test(terms[0]) && wordRegex.test(terms[1])) {
    return false;
  }

  if (initialsRegex.test(terms[terms.length - 1])) {
    return false;
  }

  return (terms.length == 2 || terms.length == 3) && terms.every((term, index) => {
    return Boolean(term.match(initialsRegex)) || Boolean(term.match(wordRegex));
  });
}

/**
 * Perform Math Operation and Return Resutl
 * Allowed Operations: ^, +, -, / , *
 *
 * @param {number} firstOperand
 * @param {number} secondOperand
 * @param {number} operation
 * @return {number}
 */
const calculate = (firstOperand, secondOperand, operation) => {
  firstOperand = typeof(firstOperand) == 'string' ? Number(firstOperand) : firstOperand;
  secondOperand = typeof(secondOperand) == 'string' ? Number(secondOperand) : secondOperand;

	switch(operation) {
		case '^':
			return firstOperand ** secondOperand;

		case '+':
			return firstOperand + secondOperand;

		case '-':
			return firstOperand - secondOperand;

		case '*':
			return firstOperand * secondOperand;

		case '/':
			return firstOperand / secondOperand;
  }
} 

/**
 * Calculating Mathematical Expression.
 * Create a function that takes a mathematical expression as a string, array of numbers on which
 * the mathematical expression is to be calculated and return the result as an array of string.
 *
 * @param {string} exp
 * @param {object} numbers
 * @return {object}
 */
function mathematicalExp(exp, numbers) {
  const [operation, rhsOperand] = exp.match(/(?<=f\(x\)=x)([\+\-\^\/\*])(?=\d)\d/g)[0].split("");

  return Array.from(numbers).map(number => {
    return `f(${number})=${calculate(number, rhsOperand, operation)}`;
  })
}

/**
 * Create a function that decomposes an address string into an array of five substrings:
 * Street Number
 * Street Name
 * City Name
 * State
 * Zip Code
 *
 * @param {string} str
 * @return {object}
 */
function decomposeAddress(str) {
  return [
    ...str.match(/^\d+/g),
    ...str.match(/[a-zA-Z]+\s[A-Z][a-z](?=\s)/g),
    ...str.match(/(?<=[A-Z][a-z]\s)(.+)(?=,)/g),
    ...str.match(/(?<=,\s)[A-Z]{2}\s\d+$/g)[0].split(' ')
  ];
}

/**
 * Molar Mass of Chemical Compound
 * Create a function that takes a name of a chemical compound
 * as a string and returns the molar mass of the compound.
 *
 * @param {string} compound
 * @return {number}
 */
function molarMass(compound) {
  const molarMassMapping = {
    'H': 1,
    'B': 10,
    'O': 16,
    'S': 32,
    'N': 14,
    'Cl': 35
  };

  const chemicalFormulaOfCompound = {
    'Water': 'H2 O',
    'BoricAcid': 'H3 B O3',
    'NitricAcid': 'H N O3',
    'SulfuricAcid': 'H2 S O4',
    'HydroChloricAcid': 'H Cl',
  };

  return chemicalFormulaOfCompound[compound].split(' ').reduce((mass, element) => {
    const chemicalElement = element.match(/[A-Z][a-z]*/g)[0];
    const numberOfMolecules = (element.match(/\d/g) || [])[0];

    return numberOfMolecules ?
      mass + molarMassMapping[chemicalElement] * Number(numberOfMolecules):
      mass + molarMassMapping[chemicalElement] * 1;
  }, 0)
}

/**
 * Validating a Set in the Set Game.
 * In the game Set, three cards form a set if each of the cards
 * are identical or completely different for each of the four properties.
 *
 * @param {object} cards
 * @return {boolean}
 */
function isSet(cards) {
  const properties = Object.keys(cards[0]);

  return properties.every(property => {
    const set = new Set(Array.from(cards).map(card => card[property]));

    return set.size == 1 || set.size == 3;
  });
}

/**
 * Track the Robot (Part 2).
 * This robot roams around a 2D grid. It starts at (0, 0) facing North. After each time it moves,
 * the robot rotates 90 degrees clockwise. Given the amount the robot has moved each time,
 * you have to calculate the robot's final position.
 *
 * @param  {...any} steps
 * @return {object} - Final Coordinates/Location of Robot (x, y)
 */
function trackRobot(...steps) {
  let currentDirection = 0;

  const directionMapping = {
    0: [0, +1],
    1: [+1, 0],
    2: [0, -1],
    3: [-1, 0]
  };

  return steps.reduce((acc, step) => {
    const [currentXCoordinate, currentYCoordinate] = acc;
    const [currentXDirection, currentYDirection] = directionMapping[(currentDirection++) % Object.keys(directionMapping).length];

    return [
      currentXCoordinate + (currentXDirection * step),
      currentYCoordinate + (currentYDirection * step),
    ];
  }, [0, 0])
}

/**
 * Happy Numbers
 * Given any number, we can create a new number by adding
 * the sums of squares of digits of that number. For example,
 * given 203, our new number is 4 + 0 + 9 = 13.
 * If we repeat this process, we get a sequence of numbers,
 * Given a positive whole number, you have to determine whether that number is happy or unhappy.
 *
 * @param {number} n
 * @return {boolean}
 */
function happy(n) {
  if (n == 1) return true;
  if (n == 4) return false;

  return happy([...`${n}`].map(Number).reduce((sumOfSquares, digit) => sumOfSquares + (digit ** 2), 0));
}

/**
 * Headline Hash Tags.
 * Write a function that retrieves the top 3 longest words of a newspaper
 * headline and transforms them into hashtags. If multiple words tie for
 * the same length, retrieve the word that occurs first.
 *
 * @param {string} str
 * @return {object}
 */
function getHashTags(str) {
  const words = str.replace(/[^a-zA-Z\s]/g, '').split(' ');

  if (words.length >= 3) {
    return words.map((word, index) => ({word, index, length: word.length}))
      .sort((wordObj1, wordObj2) => {
        if (wordObj1.length > wordObj2.length) return -1;
        if (wordObj1.length == wordObj2.length) return wordObj1.index < wordObj2.index ? -1 : 1;
        return 1;
      })
      .slice(0, 3)
      .reduce((headlines, obj) => {
        return [...headlines, `#${obj.word.toLowerCase()}`]
      }, []);
  }

  return words.sort().reverse().map(word => `#${word.toLowerCase()}`)
}

/**
 * Calculate Factorial of a Number.
 *
 * @param {number} n
 * @return {number}
 */
function factorial(n) {
  if (n == 0 || n == 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Amount of Possible Combinations.
 * @param {number} k
 * @param {number} n
 * @return {number}.
 */
function combinations(k, n) {
  return Math.round(factorial(n)/(factorial(n - k) * factorial(k)));
}
