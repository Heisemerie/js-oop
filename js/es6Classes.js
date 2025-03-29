//ES6 Classes
//JS classes are syntatic sugar for prototypical OOP
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
    this.move = function () {
      console.log("move"); //all class methods (defined in the constructor) are added to the instance
    };
  }
  draw() {
    console.log("draw"); //all class methods (defined outside the constructor) are added to the prototype of the instance objects
  }
}
const circle6 = new Rectangle(4, 1);
//classes are constructor functions
//babel is a JS compiler that compiles ES6 down to ES5

//Hoisting
//there are two ways to define functions in JS;
function sayHello() {} //Function Declaration (they are hoisted ie raised to the top of the code)
const sayGoodbye = function () {}; //Function Expression (they are not hoisted). Cannot be used before declaration

//Classes can be defined with the declaration or expression syntax. They are not hoisted;
class Septagon {} //Class Declaration
const Octagon = class {}; //Class Expression

//Static Methods
//In classical OO languages, there are two types of methods; Instance (available in the instance and prototype) and Static (available in the class) methods
class Decagon {
  constructor(side) {
    this.side = side;
  }
  draw() {
    console.log("draw");
  }
  static parse(str) {
    const side = JSON.parse(str).side; //static methods are used to create utitlity functions that are not tied to a particular object
    return new Decagon(side);
  }
}
const decagon = Decagon.parse('{ "side": 1 }');
console.log(decagon);

//The this Keyword
const Car = function () {
  this.start = function () {
    console.log("...starting");
  };
};
const car = new Car();
//Method Call ('this' points to the object created by 'new')
car.start(); //logs '...starting'
const start = car.start;
//Function call ('this' points to the global object)
start(); //logs the window object
//In strict mode, the JS engine will be more sensitive and will turn silent errors into exceptions and change the behaiour of 'this' keyword in functions
class Bike {
  kickStart() {
    console.log("...starting");
  }
}
const bike = new Bike();
const kickStart = bike.kickStart;
kickStart(); //logs undefined because the body of classes are executed in strict mode

//Private Members using Symbols
//Method 1: use underscores before the property name (useless method)
//Method 2: In ES6 there are primitive types called symbols, use them as property names (kind of private)

//Private Properties with Weakmaps
//A weakmap is a dictionary where keys are objects and value can be anything. Keys are weak (ie if there are no references they will be garbage collected)
//To create private members use the # symbol before the member name, this makes them private (uses weakmaps under the hood)
class Fruit {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    console.log(this.#name); //getter syntax
    return this.#name;
  }
}
const apple = new Fruit("apple");
apple.name; //cannot access '#name' outside the class

//Getters and Setters
//they are easier to implement with ES6 classes using the "get" and "set" keywords as used above (instead of Object.defineProperty)

//Inheritance
//Use the extends keyword for class inheritance;
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  move() {
    console.log("moving...");
  }
}
//if you have a constructor in the parent class, child constructors must call the parent constructor (super) to initialize the base object
class Truck extends Vehicle {
  constructor(brand, horsepower) {
    super(brand);
    this.horsepower = horsepower;
  }
  tow() {
    console.log("towing...");
  }
}
const jeep = new Truck("Ford", 500);
console.log(jeep);
//with the extends keyword, you do not have to reset the constructor or assign the prototype

//Method Overriding
//simply implement a method with the same name in the child class and it will be used when called. It follows the prototype chain
class Fish {
  swim() {
    console.log("swim");
  }
}
class Pirannah extends Fish {
  swim() {
    super.swim(); //if you want to reuse some code from the parent method
    console.log("pirannah swim");
  }
}
const jesse = new Pirannah();
jesse.swim();

//Exercise
//Implement a stack class
class Stack {
  #stack;
  constructor() {
    this.#stack = [];
  }
  get count() {
    return this.#stack.length; //returns the length of the stack (computed property)
  }
  peek() {
    if (this.count === 0) throw new Error("Stack is empty");
    return this.#stack[this.count - 1]; //returns the object at the top of the stack
  }
  pop() {
    if (this.count === 0) throw new Error("Stack is empty");
    return this.#stack.pop(); //removes and returns the object at the top of the stack
  }
  push(value) {
    this.#stack.push(value); //adds a value at the top of the stack
  }
}
const stack = new Stack();
