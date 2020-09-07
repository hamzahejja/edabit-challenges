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

?>
