/*
PROBLEM:
--------
ATM should dispense requested amount using minimum number of banknotes

INPUT:
-------
- array of numbers (available notes denominations in ATM)
- a number (required amount by customer)

OUTPUT:
-------
- array of numbers (denominations used) OR the failure message

RULES:
------
- ATM should use as few notes as possible to dispense cash
- if it is not possible, output: 'This amount cannot be issued'

EXAMPLES:
---------
input: [1, 3, 7, 12, 32], 40
===> 1, 7, 32

input: [10, 50, 100, 500, 1000], 99
===> This amount cannot be issued

input: [1, 7, 20, 50], 89
====> 1, 1, 1, 1, 1, 7, 7, 20, 50

Assumptions:
- array of numbers given as input is always sorted in an ascending order
- there is no requirement to not mutate the input array

DATA STRUCTURES:
----------------
- use an array to store the selected banknote denominations
- and then output the numbers in the array IF desired cash is achieved

ALGORITHM:
----------
- define a function that takes an array and a number as arguments
- input number is the exact desired sum we have to achieve
    - using as few numbers from the input array as possible
- declare a variable and set it to 0 to track the total sum
- declare a variable and set it to an ampty array to keep track of used denominations

- input arrays are sorted in ascending order
- we need iterate over the array in some fashion
- since at any point we may achieve our desired sum, we need to break out of the iteration
- Hence we will use for loop in order to iterate over the array
- and start iterating from the end (the biggest denomination)

- on each iteration we want to repeat this process with the current denomination

WHILE LOOP SUM < AMOUNT
  - check if adding denomination to the sum makes it greater than the required amount
    - if it does, break the while loop and go to next iteration (use the next denomination)
  - if adding denomination to the sum makes it less than or equal to the required amount
    - add the denomination to the sum,
    - add it to the array as well
     and go the next iteration of WHILE LOOP
END

- break out of for loop if sum === amount (no need to use any more denominations)
- return the array of denominations if the desired sum is achieved

PSEUDO CODE:
FUNCTION getDenominations (ARRAY, AMOUNT)
  SUM = 0
  DENOMS = []

  FOR LOOP iterate over the array starting from the last element

    start a WHILE LOOP condition = SUM < AMOUNT
      IF SUM + current Denom > AMOUNT
        break out of while loop
      else
        SUM += current denom
        DENOMS unshift current denom
      end
    END WHILE LOOP

    IF SUM === AMOUNT return DENOMS array out of function
  END FOR LOOP

  return 'This amount cannot be issued'
END

*/

function getDenominations(arr, num) {
  let sum = 0;
  let denoms = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    while (sum < num) {
      if (sum + arr[i] <= num) {
        sum += arr[i];
        denoms.unshift(arr[i]);
      } else {
        break;
      }
    }

    if (sum === num) { return denoms }
  }

  return 'This amount cannot be issued';
}

// Example test cases
console.log(getDenominations([1, 3, 7, 12, 32], 40));
// [1, 7, 32]
console.log(getDenominations([10, 50, 100, 500, 1000], 99));
// This amount cannot be issued
console.log(getDenominations([1, 7, 20, 50], 89));
// [1, 1, 1, 1, 1, 7, 7, 20, 50]

// If we only need the biggest banknote
console.log(getDenominations([1, 3, 7, 12, 32], 32));
// [32]

// If we only need the smallest banknote
console.log(getDenominations([1, 3, 7, 12, 32], 1));
// [1]

// If we need all the denominations one each
console.log(getDenominations([1, 7, 20, 50], 78));
// [1, 7, 20, 50]

// Same denominations available but double the amount
console.log(getDenominations([1, 7, 20, 50], 156));
// [1,  1,  1,  1, 1, 1, 50, 50, 50]

// not issue-able amount
console.log(getDenominations([10, 50, 100, 500, 1000], 1159));
// This amount cannot be issued
