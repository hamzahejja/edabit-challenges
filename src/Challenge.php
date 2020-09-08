<?php

/**
 * Create a function that takes in an array and returns
 * an array of the accumulating sum.
 *
 * @param array $originalArr
 * @return array
 */
function accumulatingArray($originalArr) {
    $sum = array_reduce($originalArr, function($acc, $val) { return $acc + $val; }, 0);

    return array_map(function($index) use ($sum, $originalArr) {
        return $sum - array_sum(array_slice($originalArr, $index + 1));
    }, count($originalArr) === 0 ? [] : range(0, count($originalArr) - 1));
}

/**
 * Combined Consecutive Sequence.
 * Write a function that returns true if two arrays, when combined, form a consecutive sequence.
 *
 * @param array $a1
 * @param array $a2
 * @return boolean
 */
function consecutiveCombo($a1, $a2) {
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
 * @param integer $point
 * @return integer
 */
function countOverlapping($intervals, $point) {
    return count(array_filter($intervals, function($interval) use ($point) {
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
function mergeArrays($a, $b) {
    $minLength = min(count($a), count($b));
    $maxLength = max(count($a), count($b));

    $result = array_reduce(range(0, $minLength - 1), function($acc, $index) use ($a, $b) {
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
 * @param integer $num1
 * @param integer $num2
 * @return integer
 */
function digitDistance($num1, $num2) {
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
 * @return boolean
 */
function canBuild($digits, $arr) {
    $requiredCountOfDigits = array_reduce($arr, function($acc, $number) {
        $digits = str_split(strval($number));
        for($i = 0; $i < count($digits); $i++) {
            $acc[$digits[$i]] = array_key_exists($digits[$i], $acc) ? $acc[$digits[$i]] + 1 : 1;
        }

        return $acc;
    }, []);

    foreach($requiredCountOfDigits as $d => $requiredCount) {
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
function countDigits($arr, $type) {
    return array_map(function($number) use ($type) {
        $digits = str_split(strval($number));
        $oddCount = count(array_filter($digits, function($digit) { return $digit % 2 != 0; }));

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
 * @return integer
 */
function findFulcrum($arr) {
	foreach(array_slice($arr, 1, -1, true) as $index => $num) {
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
 * @param integer $target
 * @return array
 */
function allPairs($arr, $target) {
    $foundNumbers = [];
    $matchingPairs = [];

    foreach($arr as $number) {
        if (array_search($target - $number, $foundNumbers) !== false) {
            $matchingPairs[] = $number > ($target - $number) ?
                [$target - $number, $number] : [$number, $target - $number];
        } else {
            $foundNumbers[] = $number;
        }
    }

    usort($matchingPairs, function($lhsPair, $rhsPair) {
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
function getProducts($arr) {
    $countOfZeros = count(array_filter($arr, function($val) { return $val === 0; }));

    if ($countOfZeros > 1) return array_fill(0, count($arr), 0);

    else if ($countOfZeros == 1) {
        $nonZeroProduct = array_product(array_filter($arr, function($val) { return $val !== 0; }));

        return array_map(function($val) use ($nonZeroProduct) {
            return $val !== 0 ? 0 : $nonZeroProduct;
        }, $arr);
    }

    $productOfAllElements = array_reduce($arr, function($product, $val) { return $product * $val; }, 1);
    return array_map(function($val) use ($productOfAllElements) { return $productOfAllElements / $val; }, $arr);
}

/**
 * Remix the String.
 * Create a function that takes both a string and an array of numbers as arguments.
 *  Rearrange the letters in the string to be in the order specified by the index numbers. Return the "remixed" string.
 *
 * @param string $str
 * @param array $arr
 */
function remix($str, $arr) {
    $rearrangedByOrderSpecified = array_reduce(range(0, strlen($str) - 1), function ($acc, $i) use ($str, $arr) {
        $acc[$arr[$i]] = $str[$i];
        return $acc;
    }, array_fill(0, strlen($str), ''));

    return implode('', $rearrangedByOrderSpecified);
}



?>
