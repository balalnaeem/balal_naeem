/*
PROBLEM:
--------
- numbers are sorted lexicographically (as strings)
- we have to find the place of a given number in a range
- range is created from 1 till the number we are given

INPUT:
------
  - a number (range upper limit)
  - a number (to look for in the ordered range)

OUTPUT:
-------
  - a number (place in the ordered range)

ASSUMPTIONS/EDGECASES:
------------
- n (range limit) is always a positive number
- n is greater than 1
- k will always be a number that is in the range

ALGORITHM:
----------
- construct a range (array) starting from number 1 till n (for loop)
- transform the range from number data types to strings (map)
- sort the range lexicographically (sort)
- transform it back to the numbers (map)
- find the place of k in the range (indexOf)
- return the index + 1

*/

function getStrangeIndex(n, k) {
  const range = [];

  for (let i = 1; i <= n; i++) {
    range.push(i);
  }

  return range.map(String)
                .sort()
                .map(Number)
                .indexOf(k) + 1;
}

console.log(getStrangeIndex(11, 2));        // 4
console.log(getStrangeIndex(15, 15));       // 7
console.log(getStrangeIndex(29, 3));        // 23
