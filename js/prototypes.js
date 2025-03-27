//Inheritance
//Enables an object to take on the props and methods of another object aiding reusability
//there are two types of inheritance; classical and prototypical
//We implement inheritance in Classes by extending classes
//We implement inheritance in Objects by using a prototype property (__proto__)) to link parent and children objects

//Prototypical Inheritance
//JS uses prototypical inhersitance because it only has objects and no classes
//To implement inheritance only using objects you create an object that contains all common behaviour (prototype) and link them to children objects
//Every object in JS has a protoytype (parent) and inherits all the members defined in its prototype except one object; 'objectBase'
//'objectBase' is the root of all objects in JS and has no prototype (parent ie '__proto__' property).
//The prototype (objectBase) contains the 'Object' constructor and other shared members for the children object to inherit
//JS engine first looks for a member in the object itself, if not found then it looks at the prototype; this is prototypical inheritance
let x = {};
let y = {};
console.log(
  "Equal prototypes",
  Object.getPrototypeOf(x) === Object.getPrototypeOf(y) //prove x & y all share the single instance (same reference) of the same prototype (objectBase)
); //Object.getPrototypeOf is used to get the prototype

//Multi-level Inheritance
const myArray = [];
console.log("myArray.__proto__", myArray.__proto__); //'__proto__' used to access prototype but is deprecated
//myArray inherits from 'arrayBase'('myArray.__proto__') which inherits from 'objectBase' ('objectBase.__proto__') from earlier (ie multi-level inheritance)
//myArray => arrayBase (contains 'Array' constructor & array methods) => objectBase (contains 'Object' constructor and object methods)
const circle5 = new Circle(); //constructor from objects.js file
// circle5 => circleBase (created by js and contains the constructor and members) => objectBase
console.log(circle5); //will have a prototype 'circleBase' which inherits from 'objectBase'

//Property Descriptors (Attributes)
let person = { name: "Ejike" };
console.log("Person", person);
for (const key in person) {
  //if you iterate over the members of the person object, you will not see the members inherited from prototype
  console.log(key);
}
console.log(Object.keys(person)); //the prototype properties are hidden because properties have attributes which can prevent them from being enumerable
const objectBase = Object.getPrototypeOf(person); //get prototype
const descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString"); //show attributes attachecd to 'toString' in objectBase
console.log(descriptor); //logs {writable: true, enumerable: false, configurable: true, value: ƒ}
Object.defineProperty(person, "name", {
  configurable: false, //cannot be deleted
  enumerable: false, //cannot be enumarated
  writable: false, //name is read-only
});
person.name = "John";
delete person.name;
console.log(person); //logs { name: "Ejike" }

//Constructor Prototypes
//Every constructor function has a prototype property (because functions are objects)
function Square(length) {
  this.length = length;
}
const square = new Square();
console.log("Square.prototype", Square.prototype); //this is the object that will be used as the parent for the objects created by the Square constructor (squareBase)
console.log(
  "Constructor and object prototype equal: ",
  Object.getPrototypeOf(square) === Square.prototype
); //in other words; square.__proto__ and Square.prototype are equal (squareBase)

//Prototype vs Instance Members
function Circles(radius) {
  this.radius = radius;
  this.location = { x: 2, y: 2 };
  /*this.draw = function () {
    console.log("Constructor function draw");
  };*/
} //the draw method will be repeated in c1 and c2, to save memory, add the draw method to the cirlceBase prototype (because JS objects are dynamic)
Circles.prototype.draw = function () {
  console.log("Constructor function draw");
};
const c1 = new Circles(1);
const c2 = new Circles(2);
console.log("c1", c1);
console.log("c2", c2);
//there are two types of members in JS;  Instance and Prototype members
Circles.prototype.toString = function () {
  return "Circle with radius" + this.radius; // you can override the implementation of prototype members
};
console.log(c1.toString());
//finally you can call instance methods in prototype methods and vice versa

//Iterating Instance and Prototype Members
//how to iterate over instance properties vs prototype properties;
console.log("Object.keys()", Object.keys(c1)); //only returns instance members
for (const key in c1) {
  console.log("for...in: ", key); //for...in returns all members added by you (instance + prototype)
}
console.log("hasOwnProperty", c1.hasOwnProperty("draw")); //hasOwnProperty is used to check instance/prototype properties

//Avoid Extending the Built-in Objects
//Don't modify the built-in objects in JS

//Exercise
//Put methods under prototypes as an optimization technique (properties must be converted to public read-only members before they can be accessed in the prototype method)
//Put the methods of the Stopwatch in objects.js; start, stop and reset in the prototype
