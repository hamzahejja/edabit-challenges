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

