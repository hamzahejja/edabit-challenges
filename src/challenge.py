from typing import List, Any, Optional, Union, Dict, Set
from math import ceil, sqrt
from functools import reduce
import re

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

def majority_vote(lst: List[Any]) -> Optional[Any]:
    return next((el for el in lst if lst.count(el) > len(lst) / 2), None)

def min_miss_pos(lst: List[int]) -> int:
    return min(i for i in range(1, max(lst) + 2) if i not in lst)

def show_the_love(lst: List[int]) -> List[float]:
    min_element = min(lst)
    total_removed = (sum(lst) - min_element) * 0.25
    return [0.75*el if el != min_element else el+total_removed for el in lst]

def filter_primes(num: List[int]) -> List[int]:
    return [k for k in num if k >= 2 and all(k % f for f in range(2, k))]

def sum_primes(lst: List[int]) -> Optional[int]:
    is_prime = lambda el: el > 1 and all(el % f for f in range(2, el))
    return sum(el for el in lst if is_prime(el)) or None

def remove_letters(letters: List[str], word: str) -> List[str]:
    return sorted(list(set([ch for ch in letters if letters.count(ch) > word.count(ch)])), key=letters.index)

def checker_board(n: int, el1: Union[int, str], el2: Union[int, str]) -> List[Union[int, str]]:
    if el1 == el2:
        return 'invalid'
    return [[el1 if j % 2 else el2 for j in range(n)] if i % 2 else [el2 if j % 2 else el1 for j in range(n)] for i in range(n)]

def find_longest(sentence: str) -> str:
    return max([re.sub('\'s|[^a-zA-Z]', '', word) for word in sentence.lower().split(' ')], key=len)

def same_line(lst: List[List[int]]) -> bool:
    slope = lambda p1,p2: (p2[1]-p1[1])/(p2[0]-p1[0]) if (p2[0]-p1[0]) else 0
    return all(slope(pnt1,pnt2) == slope(lst[0],lst[1]) for pnt1, pnt2 in zip(lst, lst[1:]))

def reorder_digits(lst: List[int], direction: str) -> List[int]:
    return [int(''.join(sorted(str(num), reverse = direction == 'desc'))) for num in lst]

def number_pairs(txt: str) -> int:
    numbers = list(map(int, txt.split(' ')[1:]))
    return sum(numbers.count(num) // 2 for num in set(numbers))

def larger_than_right(lst: List[int]) -> List[int]:
    return [lst[i] for i in range(len(lst)) if all(lst[j] < lst[i] for j in range(i+1, len(lst)))]

def is_ord_sub(smlst: List[int], biglst: List[int]) -> bool:
    return bool(re.match('\\d*{}\\d*'.format('[0-9]*'.join(map(str, smlst))), ''.join(map(str, biglst))))

def number_groups(group1: List[int], group2: List[int], group3: List[int]) -> List[int]:
    return sorted([el for el in set(group1+group2+group3) if sum(el in g for g in (group1, group2, group3)) > 1])

def find_missing(lst: List[List[int]]) -> int:
    if not lst or any(not sublist for sublist in lst):
        return False
    lengths = [len(sublist) for sublist in lst]
    return sum(range(min(lengths), max(lengths) + 1)) - sum(lengths)

def covered_integers(lst: List[List[int]]) -> int:
    return len({el for x,y in lst for el in range(x, y + 1)})

def mode(nums: List[int]) -> List[int]:
    return sorted({num for num in set(nums) if nums.count(num) == max(nums.count(n) for n in nums)})

def alternate_sort(lst: List[Union[int, str]]) -> List[Union[int,str]]:
    nums = sorted(k for k in lst if type(k) is int)
    letters = sorted(l for l in lst if type(l) is str)
    return reduce(lambda acc,sublist: acc+sublist, [[num, letter] for num, letter in zip(nums, letters)], [])

def odd_sort(lst: List[int]) -> List[int]:
    it = iter(sorted([el for el in lst if el % 2]))
    return [next(it) if el % 2 else el for el in lst]

def tidy_books(lst: List[List[str]]) -> List[List[str]]:
    return [[s.strip() for s in entry[0].split(' - ')] for entry in lst]

def available_spots(lst: List[int], num: int) -> int:
    return sum(x % 2 == num % 2 or y % 2 == num % 2 for x,y in zip(lst, lst[1:]))

def replace_next_largest(lst: List[int]) -> List[int]:
    return [min([el for el in set(lst)-{lst[i]} if el > lst[i]] or [-1]) for i in range(len(lst))]

def get_length(lst: List[List[int]]) -> int:
    return len(re.findall('\\d+', str(lst)))

def is_checkerboard(lst: List[List[int]]) -> bool:
    return all([1 - el for el in l1] == l2 for l1, l2 in zip(lst, lst[1:]))

def all_pairs(lst: List[int], target: int) -> List[List[int]]:
    pairs = []
    sorted_list = sorted(lst.copy())
    for i in range(len(sorted_list)):
        for j in sorted_list[i+1:]:
            if sorted_list[i] + j == target:
                pairs.append([sorted_list[i], j])
    return pairs

def split_n_cases(txt: str, cases: int) -> List[str]:
    if len(txt) % cases:
        return ["Error"]
    return [txt[i*(len(txt)//cases): i*(len(txt)//cases) + len(txt) // cases] for i in range(cases)]

def highest_pair(cards: List[str]) -> Union[List[Union[bool,str]], bool]:
    pairs = [card for card in set(cards) if cards.count(card) >= 2]
    return [True, max(pairs, key = '123456789JQKA'.index)] if pairs else False

def sel_reverse(lst: List[int], length: int) -> List[int]:
    return sum([lst[i*length:length*(i+1)][::-1] for i in range(len(lst)//length + 1)], []) if length else lst

def bridge_shuffle(lst1: List[Union[int, str]], lst2: List[Union[int, str]]) -> List[Union[int, str]]:
    min_length = min(len(lst1), len(lst2))
    return [j for x in ([[lst1[i],lst2[i]] for i in range(min_length)]) for j in x] + (lst1[min_length:] or lst2[min_length:])

def left_rotations(txt: str) -> List[str]:
    return [''.join(txt[(i+shiftbits) % len(txt)] for i in range(len(txt))) for shiftbits in range(len(txt))]

def right_rotations(txt: str) -> List[str]:
    return [''.join(txt[(i - shiftbits) % len(txt)] for i in range(len(txt))) for shiftbits in range(len(txt))]

def sort_by_answer(lst: List[str]) -> List[str]:
    return sorted(lst, key = lambda eq: eval(eq.replace('x', '*')))

def odd_one_out(lst: List[str]) -> bool:
    lengths = [len(item) for item in lst]
    len_counts = [lengths.count(i) for i in set(lengths)]
    return len(set(lengths)) == 2 and 1 in len_counts

def sentence_searcher(txt: str, word: str) -> str:
    return next(iter([sentence for sentence in re.split(r"(?<=\.)\s", txt) if word.lower() in sentence.lower()]), '')

def parse_code(txt: str) -> Dict[str, str]:
    fname, lname, _id = re.split(r"0+", txt)
    return {'first_name': fname, 'last_name': lname, 'id': _id}

def convert_to_hex(txt: str) -> str:
    return ' '.join([format(ord(ch), 'x') for ch in txt])

def pluralize(lst: List[str]) -> Set[str]:
    return {'{}s'.format(word) if lst.count(word) > 1 else word for word in lst}

def is_disarium(n: int) -> bool:
    return sum(int(d) ** (idx + 1) for idx, d in enumerate(str(n))) == n

def arithmetic_operation(n: str) -> int:
    calculation_mapper = {
        '+': lambda op1, op2: op1 + op2,
        '-': lambda op1, op2: op1 - op2,
        '*': lambda op1, op2: op1 * op2,
        '//': lambda op1, op2: op1 // op2 if op2 else -1
    }

    op1, operation, op2 = n.split(' ')
    return calculation_mapper[operation](int(op1), int(op2))

def uncensor(txt: str, vowels: str) -> str:
    vowels_iter = iter(vowels)
    return ''.join(next(vowels_iter) if ch == '*' else ch for ch in txt)

def censor_string(txt: str, lst: List[str], char: str) -> str:
    return ' '.join([char * len(word) if word in lst else word for word in txt.split(' ')])

def first_before_second(s: str, first: str, second: str) -> bool:
    return first not in s[s.index(second) + 1:]

def vowel_links(txt: str) -> bool:
    return any(lword[-1] in 'aeiou' and rword[0] in 'aeiou' for lword, rword in zip(txt.split(), txt.split()[1:]))

def no_duplicate_letters(phrase):
    return all(len(word) == len(set(word)) for word in phrase.lower().split())

def sort_by_letter(lst: List[str]) -> List[str]:
	return sorted(lst, key = lambda w: ord(re.findall(r"[a-zA-Z]", w)[0]))

def is_valid_hex_code(txt: str) -> bool:
    return bool(re.match(r"#[0-9a-f]{6}$", txt, flags= re.IGNORECASE))

def is_correct_aliases(names: List[str], aliases: List[str]) -> bool:
	return all(word.istitle() and word.startswith(name[0]) for name, alias in zip(names, aliases) for word in alias.split())

def inverter(txt: str, t: str) -> str:
    return ' '.join(w[::-1] for w in txt.split()).capitalize() if t == 'W' else ' '.join(txt.split()[::-1]).capitalize()


class Magic:
    def replace(self, string, old, new):
        return string.replace(old, new)
    def str_length(self, string):
        return len(string)
    def trim(self, string):
        return string.strip()
    def list_slice(self, lst, tpl):
        start, end = tpl
        return lst[start-1:end]

class Employee:
    def __init__(self, firstname, lastname, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.salary = salary

    @classmethod
    def from_string(cls, attributes):
        fname, lname, salary = attributes.split('-')
        attributes_mapping = {'firstname': fname, 'lastname': lname, 'salary': int(salary)}
        return cls(**attributes_mapping)

class Employee:
    def __init__(self, fullname, **kwargs):
        self.name, self.lastname = fullname.split()
        for attr, value in kwargs.items():
            setattr(self, attr, value)

class Memories:
    def add(self, **kwargs):
        for attr, val in kwargs.items():
            setattr(self, attr, val)

    def remember(self, key):
        return getattr(self, key, False)

class Pagination:
    def __init__(self, items=[], pageSize=10):
        self.items = items
        self.pageSize = int(pageSize)
        self.totalPages = (len(items) // pageSize  + 1) if len(items) % pageSize else len(items) // pageSize
        self.currentPage = 1

    def getItems(self):
        return self.items

    def getPageSize(self):
        return self.pageSize

    def getCurrentPage(self):
        return self.currentPage

    def getTotalPages(self):
        return self.totalPages

    def prevPage(self):
        if self.currentPage > 1:
            self.currentPage -= 1
        return self

    def nextPage(self):
        if self.currentPage < self.totalPages:
            self.currentPage += 1
        return self

    def firstPage(self):
        self.currentPage = 1
        return self

    def lastPage(self):
        self.currentPage = self.totalPages
        return self

    def goToPage(self, page):
        page = int(page)
        if page in range(1, self.totalPages + 1):
            self.currentPage = page
        else:
            self.currentPage = 1 if page < 1 else self.totalPages
        return self

    def getVisibleItems(self):
        pgindex = self.currentPage - 1
        return self.items[pgindex * self.pageSize: self.pageSize * (pgindex + 1)]