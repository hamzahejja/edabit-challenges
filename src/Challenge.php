<?php

/**
 * Create a function that takes in an array and returns
 * an array of the accumulating sum.
 *
 * @param array $originalArr
 * @return array
 */
function accumulatingArray(array $originalArr) : array
{
    $sum = array_reduce($originalArr, function ($acc, $val) { return $acc + $val; }, 0);

    return array_map(function ($index) use ($sum, $originalArr) {
        return $sum - array_sum(array_slice($originalArr, $index + 1));
    }, count($originalArr) === 0 ? [] : range(0, count($originalArr) - 1));
}

/**
 * Combined Consecutive Sequence.
 * Write a function that returns true if two arrays, when combined, form a consecutive sequence.
 *
 * @param array $a1
 * @param array $a2
 * @return bool
 */
function consecutiveCombo(array $a1, array $a2) : bool
{
    $combinedElements = array_merge($a1, $a2);
    $consecutiveSequenceOfElements = range(min($combinedElements), max($combinedElements), 1);

    return ! count(array_diff($consecutiveSequenceOfElements, $combinedElements));
}

/**
 * Intersecting Intervals.
 * Create a function that takes in an array of intervals and returns
 * how many intervals overlap with a given point.
 * An interval overlaps a particular point if the point exists
 * inside the interval, or on the interval's boundary.
 *
 * @param array $intervals
 * @param int $point
 * @return int
 */
function countOverlapping(array $intervals, int $point) : int
{
    return count(array_filter($intervals, function ($interval) use ($point) {
        $lowerBoundary = $interval[0];
        $upperBoundary = $interval[1];

        return $point >= $lowerBoundary && $point <= $upperBoundary;
    }));
}

/**
 * Create a function that takes two arrays and combines them
 * by alternatingly taking elements from each array in turn.
 *
 * @param array $a
 * @param array $b
 * @return array
 */
function mergeArrays(array $a, array $b) : array
{
    $minLength = min(count($a), count($b));
    $maxLength = max(count($a), count($b));

    $result = array_reduce(range(0, $minLength - 1), function ($acc, $index) use ($a, $b) {
        return array_merge($acc, [$a[$index], $b[$index]]);
    }, []);

    return $minLength === $maxLength ?
        $result :
        array_merge($result, array_slice($a, $minLength), array_slice($b, $minLength));
}

/**
 * Digit Distance.
 * The digit distance between two numbers is the total
 * value of the difference between each pair of digits.
 *
 * @param int $num1
 * @param int $num2
 * @return int
 */
function digitDistance(int $num1, int $num2) : int
{
    $totalDistance = 0;

    while ($num1 && $num2) {
        $totalDistance += abs($num1 % 10 - $num2 % 10);
        $num1 /= 10;
        $num2 /= 10;
    }

    return $totalDistance;
}

/**
 * Can You Make the Numbers.
 * You are given an array representing the number of 0s, 1s, 2s, ..., 9s you have.
 * can_build([#0s, #1s, #2s, ..., #9s], [num1, num2, ...])
 * Write a function that returns true if you can build the following numbers using only the digits you have.
 *
 * @param array $digits
 * @param array $arr
 * @return bool
 */
function canBuild(array $digits, array $arr) : bool
{
    $requiredCountOfDigits = array_reduce($arr, function ($acc, $number) {
        $digits = str_split(strval($number));
        for ($i = 0; $i < count($digits); $i++) {
            $acc[$digits[$i]] = array_key_exists($digits[$i], $acc) ? $acc[$digits[$i]] + 1 : 1;
        }

        return $acc;
    }, []);

    foreach ($requiredCountOfDigits as $d => $requiredCount) {
        if ($digits[$d] < $requiredCount) {
            return false;
        }
    }

    return true;
}

/**
 * Number of Even or Odd Digits.
 * Create a function that takes in an array of integers and returns
 * the number of even or odd digits for each number, depending on the parameter.
 *
 * @param array $arr
 * @param string $type
 * @return array
 */
function countDigits(array $arr, string $type) : array
{
    return array_map(function ($number) use ($type) {
        $digits = str_split(strval($number));
        $oddCount = count(array_filter($digits, function ($digit) { return $digit % 2 != 0; }));

        return $type === "odd" ? $oddCount : count($digits) - $oddCount;
    }, $arr);
}
/**
 * Find the Fulcrum
 * A fulcrum of an array is an integer such that all elements to the
 * left of it and all elements to the right of it sum to the same value.
 * Write a function that finds the fulcrum of an array.
 *
 * @param array $arr
 * @return int
 */
function findFulcrum(array $arr) : int
{
	foreach (array_slice($arr, 1, -1, true) as $index => $num) {
        $leftSum = array_sum(array_slice($arr, 0, $index));
        $rightSum = array_sum(array_slice($arr, $index + 1));

        if ($leftSum === $rightSum) {
            return $num;
        }
    }

    return -1;
}

/**
 * All Pairs that Sum to Target.
 * Create a function that returns all pairs of numbers in an array that sum to a target.
 * Sort the pairs in ascending order with respect to the smaller number,
 * then order each pair in this order: [smaller, larger].
 *
 * @param array $arr
 * @param int $target
 * @return array
 */
function allPairs(array $arr, int $target) : array
{
    $foundNumbers = [];
    $matchingPairs = [];

    foreach ($arr as $number) {
        if (array_search($target - $number, $foundNumbers) !== false) {
            $matchingPairs[] = $number > ($target - $number) ?
                [$target - $number, $number]:
                [$number, $target - $number];
        } else {
            $foundNumbers[] = $number;
        }
    }

    usort($matchingPairs, function ($lhsPair, $rhsPair) {
        $lhsSmallerNumber = min($lhsPair);
        $rhsSmallerNumber = min($rhsPair);

        return $lhsSmallerNumber - $rhsSmallerNumber;
    });

    return $matchingPairs;
}

/**
 * Product of All Other Numbers.
 * You have an array of integers, and for each index you want to find the product of
 * every integer except the integer at that index. Create a function that takes an
 * array of integers and returns an array of the products.
 *
 * @param array $arr
 * @return array
 */
function getProducts(array $arr) : array
{
    $countOfZeros = count(array_filter($arr, function ($val) { return $val === 0; }));

    if ($countOfZeros > 1) return array_fill(0, count($arr), 0);

    elseif ($countOfZeros == 1) {
        $nonZeroProduct = array_product(array_filter($arr, function ($val) { return $val !== 0; }));

        return array_map(function ($val) use ($nonZeroProduct) {
            return $val !== 0 ? 0 : $nonZeroProduct;
        }, $arr);
    }

    $productOfAllElements = array_reduce($arr, function ($product, $val) { return $product * $val; }, 1);
    return array_map(function ($val) use ($productOfAllElements) { return $productOfAllElements / $val; }, $arr);
}

/**
 * Remix the String.
 * Create a function that takes both a string and an array of numbers as arguments.
 *  Rearrange the letters in the string to be in the order specified by the index numbers. Return the "remixed" string.
 *
 * @param string $str
 * @param array $arr
 * @return string
 */
function remix(string $str, array $arr) : string
{
    $rearrangedByOrderSpecified = array_reduce(range(0, strlen($str) - 1), function ($acc, $i) use ($str, $arr) {
        $acc[$arr[$i]] = $str[$i];
        return $acc;
    }, array_fill(0, strlen($str), ''));

    return implode('', $rearrangedByOrderSpecified);
}

/**
 * Spicy Food.
 * Given your friend's unfortunate taste preferences, you decide to split the bill
 * only for non-spicy items. You will pay in full for the spicy dishes.
 * Given two ordered arrays, one classifying the dishes as spicy vs. non-spicy and the other
 * listing their prices, write a function that outputs an array where the first element is how
 * much you pay and the second element is how much your friend pays.
 *
 * @param array $spicy
 * @param array $cost
 * @return array
 */
function billSplit(array $spicy, array $cost) : array
{
    $totalBill = array_sum($cost);
    $myPay = array_reduce(
        range(0, count($spicy) - 1),
        function ($acc, $index) use ($spicy, $cost) {
            return $acc + (strcmp(strtolower($spicy[$index]), 'n') ? $cost[$index] : $cost[$index] / 2);
        }, 0);

    return [intval($myPay), intval($totalBill - $myPay)];
}


function currentlyWinning(array $scores) : array
{
    $scoresOfY = array_map(function ($key) use ($scores) { return $scores[$key]; }, array_filter(array_keys($scores), function ($key) { return $key % 2 === 0; }));
    $scoresOfO = array_map(function ($key) use ($scores) { return $scores[$key]; }, array_filter(array_keys($scores), function ($key) { return $key % 2 !== 0; }));

    $cumulativeScoresY = [];
    $cumulativeScoresO = [];

	array_map(function ($index, $val) use (&$cumulativeScoresY) {
            $cumulativeScoresY[$index] = $cumulativeScoresY ? $val + $cumulativeScoresY[$index - 1] : $val;
        },
        range(0, count($scores) / 2 - 1),
        $scoresOfY
    );

    array_map(function ($index, $val) use (&$cumulativeScoresO) {
            $cumulativeScoresO[$index] = $cumulativeScoresO ? $val + $cumulativeScoresO[$index - 1] : $val;
        },
        range(0, count($scores) / 2 - 1),
        $scoresOfO
    );

    return array_map(function ($cumulativeScoreY, $cumulativeScoreO) {
        if ($cumulativeScoreY > $cumulativeScoreO) {
            return 'Y';
        } elseif ($cumulativeScoreY < $cumulativeScoreO) {
            return 'O';
        } else {
            return 'T';
        }
    }, $cumulativeScoresY, $cumulativeScoresO);
}

/**
 * Which Number Is Not like the Others?
 * Create a function that takes an array of numbers and return the number that's unique.
 *
 * @param array $arr
 * @return int
 */
function unique(array $arr) : int
{
    $countOfValues = array_reduce($arr, function ($acc, $val) {
        $key = strval($val);

        return array_replace($acc, [$key => array_key_exists($key, $acc) ? $acc[$key] + 1 : 1]);
    }, []);

	return array_keys(array_filter($countOfValues, function ($count) { return $count === 1; }))[0];
}

/**
 * Tallest Skyscraper.
 * A city skyline can be represented as a 2-D array with 1s representing buildings.
 * Create a function that takes a skyline (2-D array of 0's and 1's) and returns the height of the tallest skyscraper.
 *
 * @param array $arr
 * @return int
 */
function tallestSkyscraper(array $arr) : int
{
    $columnsCount = count(reset($arr));
    $heightsOfSkyscrapers = array_map(function ($colIndex) use ($arr) {
        $colContentsAsStr = implode('', array_column($arr, $colIndex));

        return strlen($colContentsAsStr) - strlen(preg_replace('/(1)((?<=1)|(?=1))/', '', $colContentsAsStr));
    }, range(0, $columnsCount - 1));

    return max($heightsOfSkyscrapers);
}

/**
 * Create a function that alternates the case of the letters in a string (known as Spongecase).
 * The first letter should always be UPPERCASE.
 * Ignore spaces.
 *
 * @param string $str
 * @return string
 */
function alternatingCaps(string $str) : string
{
	$alternatingCapsCharacters = array_reduce(range(1, strlen($str) - 1), function ($acc, $index) use ($str) {
        $lastSeenChar = ctype_space($acc[$index - 1]) ? $acc[$index - 2] : $acc[$index - 1];
        $acc[$index] = ctype_lower($lastSeenChar) ? strtoupper($str[$index]) : strtolower($str[$index]);

        return $acc;
    }, [strtoupper($str[0])]);

    return implode('', $alternatingCapsCharacters);
}

/**
 * Sum of Missing Numbers.
 * Create a function that returns the sum of missing numbers.
 * The minimum and maximum value of the given array are the inclusive
 * bounds of the numeric range to consider when searching for missing numbers.
 *
 * @param array $arr
 * @return int
 */
function sumMissingNumbers(array $arr) : int
{
    $minVal = min($arr);
    $maxVal = max($arr);

    return array_sum(range($minVal, $maxVal)) - array_sum($arr);
}

/**
 * ATM machines allow 4 or 6 digit PIN codes and PIN codes
 * cannot contain anything but exactly 4 digits or exactly 6 digits.
 *
 * @param string $pin
 * @return bool
 */
function validatePIN(string $pin) : bool
{
    return preg_match('/\b\d{4}\b|\b\d{6}\b/', $pin);
}

/**
 * Write a function that takes a string and calculates the number of
 * letters and digits within it. Return the result as an array.
 *
 * @param string $str
 * @return array
 */
function countAll(string $str) : array
{
    $digitsCount = strlen(preg_replace('/[^0-9]/', '', $str));
    $lettersCount = strlen(preg_replace('/[^a-zA-Z]/', '', $str));

    return ['LETTERS' => $lettersCount, 'DIGITS' => $digitsCount];
}

/**
 * Write a function that repeats the shorter string until
 * it is equal to the length of the longer string.
 *
 * @param string $s1
 * @param string $s2
 * @return string
 */
function lengthen(string $s1, string $s2) : string {
    return strlen($s1) < strlen($s2) ?
        str_pad($s1, strlen($s2), $s1):
        str_pad($s2, strlen($s1), $s2);
}

/**
 * String Flips.
 * Create a function that takes a string as the first argument, and a (string) specification
 * as a second argument. If the specification is "word", return a string with each word reversed
 * while maintaining their original order. If the specification is "sentence", reverse the order
 * of the words in the string, while keeping the words intact.
 *
 * @param string $str
 * @param string $spec
 * @return string
 */
function flip(string $str, string $spec) : string {
	if (! strcmp($spec, 'word')) {
        $reversedWords = array_map(function ($word) {
            return strrev($word);
        }, explode(' ', $str));

        return implode(' ', $reversedWords);
    }

    return implode(' ', array_reverse(explode(' ', $str)));
}

/**
 * Split String by Identical Characters.
 * Create a function that splits a string into an array of identical clusters.
 *
 * @param string $str
 * @return array
 */
function splitGroups(string $str) : array {
	return explode(' ', trim(preg_replace('/(.)(?!\1)/', '$1 ', $str)));
}

/**
 * All or Nothing.
 * Suppose a student can earn 100% on an exam by getting the answers all correct or all incorrect.
 * Given a potentially incomplete answer key and the student's answers, write a function that determines
 * whether or not a student can still score 100%. Questions with missing answers are marked with an underscore, "_".
 *
 * @param array $key
 * @param array $answers
 * @return bool
 */
function possiblyPerfect(array $key,  array $answers) : bool {
    $allCorrect = true;
    $allIncorrect = true;

	array_walk($answers, function ($studentAnswer, $index) use ($key, &$allCorrect, &$allIncorrect) {
        if ($studentAnswer !== '_' && $key[$index] !== '_') {
            $allCorrect = $allCorrect && ($studentAnswer === $key[$index]);
            $allIncorrect = $allIncorrect && ($studentAnswer !== $key[$index]);
        }
    });

    return $allCorrect || $allIncorrect;
}

/**
 * Sort a String by Its Last Character.
 * Create a function that takes a string of words and return a string sorted alphabetically by the last character of each word.
 * If two words have the same last character, sort by the order they originally appeared.
 *
 * @param string $str
 * @return string
 */
function sortByLast(string $str) : string {
    $words = explode(' ', $str);

	usort($words, function ($lhsWord, $rhsWord) {
        return $lhsWord[strlen($lhsWord) - 1] <=> $rhsWord[strlen($rhsWord) - 1];
    });

    return implode(' ', $words);
}

/**
 * Create a function that accepts a string as an argument. Find its shortest word(s)
 * and return them as an array sorted alphabetically (if there are multiple shortest words).
 * NOTE: Periods, commas and other special characters don't count as part of a word's length
 * NOTE: Return words in lowercase only.
 *
 * @param string $str
 * @return array
 */
function findShortestWords(string $str) : array {
    $filteredWords = explode(' ', preg_replace('/[^\w\s]/', '', strtolower($str)));

    $minLength = min(array_map(function ($word) {
        return strlen($word);
    }, $filteredWords));

    $shortestWords = array_filter($filteredWords, function ($word) use ($minLength) {
        return strlen($word) === $minLength && ctype_alpha($word);
    });

    usort($shortestWords, function ($lhsWord, $rhsWord) {
        return $lhsWord <=> $rhsWord;
    });

    return $shortestWords;
}

/**
 * Longest Common Ending.
 * Write a function that returns the longest common ending between two strings.
 *
 * @param string $s1
 * @param string $s2
 * @return string
 */
function longestCommonEnding(string $s1, string $s2) : string {
    $commonEnding = [];

    for ($i = 0; $i < min(strlen($s1), strlen($s2)); $i++) {
        $currCharOfStr1 = $s1[strlen($s1) - 1 - $i];
        $currCharOfStr2 = $s2[strlen($s2) - 1 - $i];
        if ($currCharOfStr1 !== $currCharOfStr2) {
            break;
        }

        array_unshift($commonEnding, $currCharOfStr1);
    }

    return implode('', $commonEnding);
}

?>
