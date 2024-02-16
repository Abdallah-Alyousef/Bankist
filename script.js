'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr, i) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outComes = movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outComes)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

const createUserNames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join(' ');
  });
};
createUserNames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice());
// console.log([...arr]);

// //SPLICE mutates orignial array
// console.log(arr.splice(2));
// console.log(arr);

// //Reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// //Concat
// const letters = arr.concat(arr2);

// //Join method
// console.log(letters.join('-'));

//The new at method
//Get last element from at method by using -1
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index} You deposited ${movement}`);
  } else {
    console.log(`Movement ${index} You withdrew ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Challenge

/* 

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 

*/

const checkDogs = function (dogsJulia, dogsKate) {
  //First and last two
  const juliaShallow = dogsJulia.slice(1, -2);
  //Deleted first and last two and didnt mutate!
  const correctedArray = [...juliaShallow, ...dogsKate];
  correctedArray.forEach(function (dog, i) {
    const isAdult = dog < 3 ? 'Puppy' : 'Adult';
    console.log(`Dog number ${i + 1} is ${isAdult}`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUsd = movementss.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUsd = movementss.map(mov => mov * eurToUsd);
console.log(movementss);
console.log(movementsUsd);

const deposites = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposites);

const withdrawlss = movements.filter(x => x < 0);
console.log(withdrawlss);

//Reduce method

const balance = movements.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0);
console.log(balance);
let balanceLoop = 0;
for (const mov of movements) {
  balanceLoop += mov;
}
console.log(balanceLoop);

//Maximum value of array
const maxValue = movements.reduce((acc, curr) => {
  acc > curr ? (acc = acc) : (acc = curr);
  return acc;
}, movements[0]);
console.log(maxValue);

const calcAverageHumanAge = function (ages) {
  // Calculate dog age in human
  // const humanArray = ages.map(dog => {
  //   return dog <= 2 ? (dog = dog * 2) : (dog = 16 + dog * 4);
  // });

  const humanAges = ages
    .map(dog => (dog <= 2 ? (dog *= 2) : (dog = 16 + dog * 4)))
    .filter(curr => curr >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
  //2 + 3 /2

  // //2
  // humanArray.filter(human => {
  //   return human >= 18;
  // });
  // console.log('Filtered humans : \n');
  // humanArray.forEach((human, i) => {
  //   console.log(`Human ${i + 1} : ${human}`);
  // });
  // const average = humanArray.reduce(
  //   (acc, curr, i, arr) => acc + curr / arr.length,
  //   0
  // );

  console.log(`The average is ${humanAges}`);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

const totalDeposit = movements
  .filter(mov => mov < 0)
  .map(mov => mov * 1.1)
  .reduce((acc, curr) => acc + curr, 0);
console.log(totalDeposit);
