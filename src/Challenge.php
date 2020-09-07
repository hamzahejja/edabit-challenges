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

?>
