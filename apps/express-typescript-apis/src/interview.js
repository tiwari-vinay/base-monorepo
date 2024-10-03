// const delay = (ms = 1000, a, b) => {
//     return new Promise((resolve) => setTimeout(() => resolve(a + b), ms));
// };

// async function block(){
//     console.log("-----------before blocking-----------");
//     let res = await delay(1000, 10,20);
//     console.log(res);
//     console.log("-----------after blocking-----------");
// }

// block();

// let counter = ()=>{
//     let curCount = 0;
//     return ()=> console.log(++curCount);
// }

// let IncCount = counter();
// IncCount();
// IncCount();
// IncCount();

// console.log(new Promise((resolve) => console.log(resolve("resolved"))))

// let function1 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('hello');
//     }, 4000);
//   });
// };

// let function2 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('world!!!!');
//     }, 3000);
//   });
// };

// async function caller() {
//   await Promise.all([
//     (async () => console.log(await function1()))(),
//     (async () => console.log(await function2()))(),
//   ])
//   .then(values=> console.log(values));
// }
// caller();

// This is the way of doing parallel execution of promises, above way of handling promises can also be termed as concurrent execution since the promise functions are called but gets awaited in the console.
// Promise.all([function1(), function2()])
// .then(values=> console.log(values[0], values[1]));

// Currying
// // A functional programming concept in which a function takes multiple arguements and converts it to a series of functions which takes single arguement.
// function Curry(a){
//   return function(b){
//     return a*b;
//   }
// }

// let mulitply2 = Curry(2);

// console.log(mulitply2(3));

// Function Composition - A bunch of functions are comined so that the output of one function is the input of other function. The returning is a function which will give all composition result.

// const add = (val)=>val+5;
// const subtract = (val)=>val-3;
// const multiple = (val)=>val*2;

// // now we need to compose function in right to left order
// // const composedFn = (val)=>multiple(subtract(add(val)));
// //other way of doing hte same
// const composedFn = (...fns)=>input=>{
//   return fns.reduceRight((acc, fn)=>fn(acc), input)
// }
// const fn = composedFn(multiple, subtract, add);
// console.log(fn(10))

//call bind and apply rules
// function Hello (greet, question){
//   console.log(`hello ${this.name}`, greet, question);
// }

// let vinay = {
//   name: 'Vinay',
//   greet: 'Hello',
// }

// Hello.call(vinay, 'Namaste', 'What are you doing?');
// Hello.apply(vinay, ['Namaste', 'What are you doing?']);

// let returnfn = Hello.bind(vinay)
// returnfn();

// Prototypes:

// let obj = Object.create(null)// this doesn't have prototype

//Prototypal inheritance
// function Person(fname, lname) {
//   this.firstName = fname;
//   this.lastName = lname;
// }
// Person.prototype.getFullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// };

// function SuperHero(fname, lname) {
//   this.isSuperHero = true;
//   Person.call(this, fname, lname);
// }
// SuperHero.prototype = Object.create(Person.prototype);
// SuperHero.prototype.constructor = SuperHero.prototype;

// let batman = new SuperHero('Bruce', 'Wayne');
// console.log(
//   batman.getFullName(),
//   batman.isSuperHero ? 'is a super hero' : 'is not a supser hero.'
// );

// Iterable and iterator
// Iterator are the object which can be iterated using for..of loop. It basically is any object which implements the iterator protocol by having a next() method which has two properties value and done.

// let obj = {
//   [Symbol.iterator]: function () {
//     let step = 0;
//     step++;
//     const iterator = {
//       next: function () {
//         step++;
//         if (step == 1)
//           return {
//             value: 1,
//             done: false,
//           };
//         if (step == 2)
//           return {
//             value: 2,
//             done: false,
//           };
//         return {
//           value: undefined,
//           done: true,
//         };
//       },
//     };
//     return iterator;
//   },
// };

// for (let word of obj) {
//   console.log(word);
// }
let obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step == 1)
          return {
            value: 1,
            done: false,
          };
        if (step == 2)
          return {
            value: 2,
            done: false,
          };
        if (step == 3)
          return {
            value: undefined,
            done: true,
          };
      },
    };
    return iterator;
  },
};

for (let word of obj) {
  console.log(word);
}
