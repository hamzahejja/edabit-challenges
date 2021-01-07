from typing import List, Any, Optional, Union, Dict
from math import ceil, sqrt
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

def matrix_multiply(a, b):
    rows_a, cols_a = len(a), len(a[0]);
    rows_b, cols_b = len(b), len(b[0]);
    if cols_a != rows_b:
        return 'invalid';

    result_matrix = []
    for r in range(rows_a):
        result_row = []
        for c in range(cols_b):
            row_vals = a[r]
            col_vals = [row[c] for row in b]
            s = sum([l * r for l,r in zip(row_vals, col_vals)])
            result_row.append(s)
        result_matrix.append(result_row)
    return result_matrix

def find_even_nums(num):
	return [n for n in range(2, num + 1, 2)]

def find_odd(lst):
	return [x for x in lst if lst.count(x) % 2][0];

def filter_list(l):
	return [el for el in l if type(el) is not str]

def nth_smallest(lst, n):
	return sorted(lst)[n - 1] if (n - 1) in range(len(lst)) else None

def sort_by_length(lst):
	return sorted(lst, key=len)

def setify(lst):
	return sorted(set(lst))

def return_only_integer(lst):
    return [i for i in lst if type(i) is int]

def society_name(friends):
	return ''.join(name[0] for name in sorted(friends))

def last(a, n):
    return a[len(a) - n:] if n <= len(a) else 'invalid'

def add_indexes(lst):
    return [lst[i] + i for i in range(len(lst))]

def sum_of_evens(lst):
	return sum([e for l in lst for e in l if e % 2 == 0]);

def convert_cartesian(x, y):
	return [[x,y] for x,y in zip(x,y)]

def index_multiplier(lst):
	return sum([i*e for i,e in enumerate(lst)]);

def mapping(letters ):
	return {l.lower(): l.upper() for l in letters}

def factor_chain(lst):
	return all([lst[i+1] % lst[i] == 0 for i in range(len(lst) - 1)])

def move_to_end(lst, el):
	return [e for e in lst if e != el] + ([el] * lst.count(el))

def count_characters(lst):
	return sum(len(s) for s in lst)

def next_in_line(lst, num):
	return 'No list has been selected' if not len(lst) else lst[1:] + [num]

def trace(lst):
	return sum(lst[i][i] for i in range(len(lst)))

def simon_says(lst1, lst2):
    return lst1[:-1] == lst2[1:]

def get_budgets(lst):
	return sum(p['budget'] for p in lst)

def magnitude(lst):
	return sum(map(lambda x : x ** 2, lst)) ** 0.5

def unique_sort(lst):
	return sorted(set(lst))

def probability(lst, n):
	return round(sum([e >= n for e in lst]) / len(lst) * 100, 1)

def rotate(mat):
	return [[row[col] for row in mat][::-1] for col in range(len(mat[0]))]

def tallest_skyscraper(lst):
    return max(map(sum, [[row[col] for row in lst] for col in range(len(lst[0]))]))

def char_at_pos(r, s):
	return r[1::2] if s == 'even' else r[::2]

def collect(s, n):
    if len(s) < n:
        return []
    return sorted([s[i:i+n] for i in range(0, (len(s)//n) * n, n)])

def modify(word: str) -> str:
    modified = ''.join([s.upper() for s in reversed(word)])
    return modified[:(len(modified) + 1) // 2] + '-' + modified[(len(modified) + 1) // 2:]

def edit_words(lst: List[str]) -> List[str]:
	return list(map(modify, lst))

def secret(txt: str) -> str:
    element, *classes = txt.split('.')
    return '<{} class=\'{}\'></{}>'.format(element, ' '.join(classes), element)

def num_of_sublists(lst: List[Any]) -> int:
	return len([sl for sl in lst if type(sl) == list])

def square_patch(n: int)-> List[List[int]]:
	return [[n] * n] * n

def sum_odd_and_even(lst: List[int]) -> List[int]:
	return [sum(e for e in lst if e % 2 == 0), sum(o for o in lst if o % 2)]

def largest_gap(lst: List[int]) -> int:
    lst.sort()
    return max([lst[i + 1] - lst[i] for i in range(0, len(lst) - 1)])

def duplicates(txt: str) -> int:
	return sum(txt.count(l)-1 for l in set(txt))

def peel_layer_off(lst: List[List[Any]]) -> List[List[Any]]:
    return [sublist[1:-1] for sublist in lst[1:-1]]

def char_appears(sentence: str, char: str) -> List[int]:
	return [word.lower().count(char) for word in sentence.split()]

def even_odd_transform(lst: List[int], n: int) -> List[int]:
	return [e + 2*n if e % 2 else e - 2*n for e in lst]

def match_last_item(lst: List[Any]) -> bool:
	return ''.join(map(str, lst[:-1])) == lst[-1]

def lst_ele_sum(args: List[int]) -> List[int]:
	sum_of_elements = sum(args)
	return [sum_of_elements - arg for arg in args]

def win_round(you: List[int], opp: List[int]) -> bool:
    (x1, y1), (x2, y2) = sorted(you, reverse=True)[:2], sorted(opp, reverse=True)[:2]
    return (x1*10 + y1) > (x2*10 + y2)

def accumulating_list(lst):
    return [sum(lst[:i + 1]) for i in range(len(lst))]

def sum_every_nth(numbers: List[int], n: int) -> int:
    return sum(numbers[i] for i in range(-1+n, len(numbers), n))

def balanced(lst: List[int]) -> List[int]:
    first_half, other_half = (lst[:len(lst)//2], lst[len(lst)//2:])
    first_sum, other_sum = (sum(first_half), sum(other_half))
    if first_sum == other_sum:
        return lst

    return first_half * 2 if first_sum > other_sum else other_half * 2

def accumulating_product(lst: List[int]) -> List[int]:
    return [reduce(lambda acc,x: acc * x, lst[:i]) for i in range(1, len(lst) + 1)]

def number_length(num: int) -> int:
    return sum(1 for l in str(num))

def valid(txt: str) -> bool:
    return len(txt) in [4,6] and all([ch.isnumeric() for ch in txt])

def invert(dct: dict):
	return { value: key for key, value in dct.items() }

def expensive_orders(orders: dict, cost: int) -> dict:
	return {o: c for o, c in orders.items() if c > cost}

def keys_and_values(d: dict) -> List[List[Any]]:
    sorted_keys = sorted(d.keys())
    return [sorted_keys, [d.get(k) for k in sorted_keys]]

def common_elements(lst1: List[int], lst2: List[int]) -> List[int]:
    return sorted(list(set([e for e in lst1 if e in lst2])))

def ordered_matrix(a: int, b:int) -> List[List[int]]:
	return [[c for c in range(b*r + 1, (b*r + 1) + b)] for r in range(a)]

def tallest_building_height(lst: List[str]) -> str:
	return '{}m'.format(20 * sum([bool(s.strip()) for s in lst]))

def pirates_killed(gold: List[int], tolerance: List[int]) -> bool:
    return any(diff > tol for diff, tol in zip([max(gold) - g for g in gold], tolerance))

def bound_sort(lst: List[int], bounds: List[int]) -> bool:
    return sorted(lst[:bounds[1] + 1]) + lst[bounds[1] + 1:] == sorted(lst)

def mini_peaks(lst: List[int]) -> List[int]:
    return [lst[i] for i in range(1, len(lst) - 1) if lst[i]>lst[i-1] and lst[i]>lst[i+1]]

def merge_sort(lst1: List[int], lst2: List[int]) -> List[int]:
    return sorted(lst1 + lst2, reverse = lst1[0] > lst1[1])

def duplicate_nums(nums: List[int]) -> Optional[List[int]]:
    return sorted(list(set([d for d in nums if nums.count(d) > 1]))) or None

def total_sales(sales_table: List[List[Union[str,int]]], product: str) -> Union[int, str]:
    return sum([s[sales_table.index(product)] for s in sales_table[1:]]) if product in sales_table[0] else "Product not found"

def is_scalable(lst: List[int]) -> bool:
    return all([abs(lst[i+1] - lst[i]) <= 5 for i in range(len(lst) - 1)])

def digit_distance(num1: int, num2: int) -> int:
	return sum(n2 - n1 for n1, n2 in zip(map(int, str(num1)), map(int, str(num2))))

def cons(lst: List[int]) -> bool:
    return sorted(lst) == list(range(min(lst), max(lst) + 1))

def is_positive_dominant(lst: List[int]) -> bool:
    return len(set([pos for pos in lst if pos > 0])) > len(set([neg for neg in lst if neg < 0]))

def moving_partition(lst: List[int]) -> List[List[List[int]]]:
	return [[lst[:i], lst[i:]] for i in range(1, len(lst))]

def sort_by_character(lst: List[str], n: int) -> List[str]:
    return sorted(lst, key = lambda s: s[n - 1])

def diag_dom(lst: List[List[int]]) -> bool:
    return all(abs(lst[r][r]) > sum(map(abs, lst[r])) - abs(lst[r][r]) for r in range(len(lst)))

def check_sum(lst: List[int], n: int) -> bool:
    seen = set()
    for num in lst:
        if (n - num) in seen:
            return True
        seen.add(num)
    return False

def twins(lst: List[int]) -> int:
    return [i for i in range(len(lst)) if sum(lst[:i]) == sum(lst[i:])][0]

def can_concatenate(lst: List[List[int]], target: List[int]) -> bool:
    return sorted(sum(lst, [])) == sorted(target)

def empty_values(lst: List[Any]) -> List[Any]:
    return [type(e)() for e in lst]

def points_in_circle(points: List[dict], centerX: int, centerY: int, radius: int):
	return sum((point['x'] - centerX) ** 2 + (point['y'] - centerY) ** 2 < radius ** 2 for point in points)

def initialize(names: List[str]) -> List[str]:
	return [' '.join(map(lambda n: '{}.'.format(n[0].upper()), name.split())) for name in names]

def alternate_pos_neg(lst: List[int]) -> bool:
	return all(x * y < 0 for x,y in zip(lst, lst[1:])) and 0 not in lst

def factory(n):
	return lambda lst: [e/n for e in lst]

def standard_deviation(lst: List[int]) -> float:
    mean = sum(lst) / len(lst)
    return round((sum([abs(d-mean) ** 2 for d in lst]) / len(lst)) ** 0.5, 2)

def items_purchase(store: Dict[str, str], wallet: str) -> List[str]:
    getval = lambda x: int(x.replace('$','').replace(',',''))
    return sorted([item for item, cost in store.items() if getval(cost) <= getval(wallet)]) or 'Nothing'

def missing_letter(lst: List[str]) -> str:
    return chr(ord(next(x for x,y in zip(lst[:], lst[1:]) if ord(y) - ord(x) == 2)) + 1)

def shared_digits(lst: List[int]) -> bool:
    return all(set(str(num1)) & set(str(num2)) for num1,num2 in zip(lst, lst[1:]))

def multiplicity(lst: List[int]) -> List[List[int]]:
	return [[el, lst.count(el)] for el in sorted(set(lst), key=lst.index)]

def merge_arrays(a: List[Union[int, str]], b: List[Union[int, str]]) -> List[Union[int,]]:
    return sum([list(t) for t in zip(a, b)], []) + (b[len(a):] if len(b) > len(a) else a[len(b):])

def sort_it(lst: List[Union[List[int], int]]) -> List[Union[List[int], int]]:
	return sorted(lst, key = lambda x: x[0] if type(x) == list else x)

def num_in_str(lst: List[str]) -> List[str]:
    return [s for s in lst if any(ch.isnumeric() for ch in s)]

def check(lst: Lst[int]) -> str:
    if all(x < y for x,y in zip(lst, lst[1:])):
        return 'increasing'
    elif all(x > y for x,y in zip(lst, lst[1:])):
        return 'decreasing'
    return 'neither'

def count_repetitions(lst: List[Any]) -> Dict[Any, int]:
    return {el: lst.count(el) for el in set(lst)}

def difference_two(lst: List[int]) -> List[List[int]]:
    return sorted([[x,y] for x in lst for y in set(lst)-set([x]) if y-x == 2])

def get_products(lst: List[int]) -> List[int]:
    return [reduce(lambda acc,x: acc * x, set(lst)-{el}, 1) for el in lst]

def sliding_sum(lst: List[int], n: int, k: int) -> List[List[int]]:
	return [lst[i:i+n] for i in range(len(lst) - n + 1) if sum(lst[i:i+n]) == k]
