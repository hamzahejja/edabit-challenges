from typing import List
from math import ceil
from functools import reduce

"""
Create a function that takes two numbers as arguments (num, length)
and returns a list of multiples of num until the list length reaches length.
"""
def list_of_multiples (num, length):
    return [(num * multipiler) for multipiler in range(1, length + 1)];

"""
In each input list, every number repeats at least once, except for two.
Write a function that returns the two unique numbers.
Keep the same ordering in the output.
"""
def return_unique(lst):
    return [element for element in lst if list(lst).count(element) == 1];

"""
Create a function that returns the indices of all occurrences of an item in the list.
If an element does not exist in a list, return []
Lists are zero-indexed.
Values in the list will be value-types (don't need to worry about nested lists).
"""
def get_indices(lst, el):
    return [i for i in range(len(lst)) if lst[i] == el];

"""
Create a function that takes a list containing nested lists as an argument.
Each sublist has 2 elements. The first element is the numerator and the second element is the denominator.
Return the sum of the fractions rounded to the nearest whole number.
"""
def sum_fractions(lst):
    return round(sum([numerator/denominator for numerator, denominator in lst]))

"""
Create a function that concatenates n input lists, where n is variable.
Lists should be concatenated in order of the arguments.
"""
def concat(*argv):
    return [element for arg in argv for element in arg];

"""
Write a function that takes a list of two numbers and determines if
the sum of the digits in each number are equal to each other.
"""
def is_equal(lst):
    first_number, second_number = lst;
    first_digits_sum = sum(int(digit) for digit in str(first_number))
    second_digits_sum = sum(int(digit) for digit in str(second_number))
    return first_digits_sum == second_digits_sum

"""
Create a function that takes in a list of intervals and returns
how many intervals overlap with a given point.
An interval overlaps a particular point if the point exists inside the interval,
or on the interval's boundary. For example the point 3 overlaps with the interval [2, 4] (it is inside)
and [2, 3] (it is on the boundary).
"""
def count_overlapping(intervals, point):
	return sum(lower_bound <= point <= upper_bound for lower_bound,upper_bound in intervals);

"""
Create a function that takes a list as an argument and returns a
new nested list for each element in the original list.
The nested list must be filled with the corresponding element (string or number) in the original list
and each nested list has the same amount of elements as the original list.
"""
def multiply(l):
	return list(map(lambda x: [x] * len(l), l))

"""
Create a function that converts a date formatted as MM/DD/YYYY to YYYYDDMM.
"""
def format_date(date):
    return ''.join(date.split('/')[::-1]);

"""
Create a function that builds a word from the scrambled letters contained in the first list.
Use the second list to establish each position of the letters in the first list.
Return a string from the unscrambled letters (that made-up the word).
"""
def word_builder(ltr, pos):
    return ''.join(ltr[index] for index in pos);

"""
Write a function that converts a dictionary into a list, where each element
represents a key-value pair in the form of a list. Sort the list alphabetically by key.
"""
def to_list(dct):
	return sorted([[key, value]] for key, value in dct.items());

"""
There are many different styles of music and many albums exhibit multiple styles.
Create a function that takes a list of musical styles from albums and returns how many styles are unique.
"""
def unique_styles(albums: List[str]) -> int:
    return len(set([style for album in albums for style in album.split(',')]))

def count_datatypes(*args):
    elements_data_types = [type(arg) for arg in args];
    return [elements_data_types.count(dt) for dt in (int, str, bool, list, tuple, dict)];

def flip_list(lst):
    return [el.pop() if isinstance(el, list) else [el] for el in lst]

def pairs(lst):
    pairs = list()
    left_index = 0
    right_index = len(lst) - 1
    while left_index <= right_index:
        pairs.append([lst[left_index], lst[right_index]])
        left_index += 1
        right_index -= 1
    return pairs

def chunkify(lst, size):
    chunk_start_indices = [start_index for start_index in range(ceil(len(lst) / size))]
    return [lst[i * size: i * size + size] for i in chunk_start_indices]

def boolean_and(lst):
	return reduce(lambda acc, x: acc and x, lst, True)

def boolean_or(lst):
	return reduce(lambda acc, x: acc or x, lst, False)

def boolean_xor(lst):
	return reduce(lambda acc, x: acc ^ x, lst, False)