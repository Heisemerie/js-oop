//Object literals
const circle = {
  radius: 1,
  location: { x: 2, y: 2 },
  draw() {
    console.log("Obj literal draw");
  },
};

circle.draw();

//Factory functions
function createCircle(radius) {
  return {
    radius,
    location: { x: 2, y: 2 },
    draw() {
      console.log("Factory function draw");
    },
  };
}

const circle1 = createCircle(1); //when an object has one or more methods, it has 'behaviour'. It shouldn't be created with object literals
circle1.draw();

//Constructor functions
function Circle(radius) {
  this.radius = radius;
  this.location = { x: 2, y: 2 };
  this.draw = function () {
    console.log("Constructor function draw");
  };
}

const circle2 = new Circle(1); //the 'new' keyword creates an empty object, then set 'this' to point to the object and return the object from the constructor function
circle2.draw();

//Constructor Property
//Every object in JS has a property called 'constructor' that references the function that was used to create the object
console.log(circle2.constructor); // returns the 'Circle' constructor function
console.log(circle1.constructor); //returns the internal JS object constructor function
let obj = {}; //is the same as 'let obj = new Object()'
new String(); //string constructor but we use string literals '',"",``
new Boolean(); //but we use boolean literals true,false
new Number(); //but we use number literals 1,2,3...
new Function(); //but we use the function keyword

//Functions are Objects
console.log("Circle function name", Circle.name); //returns the name of the function
console.log("Circle function length", Circle.length); //returns the number of arguments
console.log("Circle function constructor", Circle.constructor); //returns the 'Function' constructor
Circle.call({}, 1); //is the same as 'new Circle(1)'
Circle.apply({}, [1]); //same as call but recieves an array of values

//Value vs Reference types
let a = 10;
let b = a; //copies the value of a into b
a = 20;
console.log("a", a); //returns 20
console.log("b", b); //returns 10

let c = { value: 10 };
let d = c; //copies the pointer stored in c to d (they point to the same object in memory (heap))
c.value = 20;
console.log("c", c); //returns { value: 20 }
console.log("d", d); //returns { value: 20 }

//Adding or Removing Properties
//Objects in JS are dynamic, properties can be added or deleted after creation. This allows properties to be added on the fly without modifying the constructor function or the class
const radius = 3;
const circle3 = new Circle(radius);
circle3.area = Math.PI * radius * radius; //added a new area property
console.log("Dynamic objects", circle3);
console.log(circle3["location"]); //you can use the bracket notation to access properties dynamically
delete circle3.area; //deleted area property. can be used to delete user object password before passing object to the client in real world applications

//Enumerating properties
for (const key in circle3) {
  if (typeof circle3[key] !== "function")
    //checks for only properties
    console.log("Circle3", key, circle3[key]); // for...in allows to access keys in an object and enumerate all members
}
const keys = Object.keys(circle3); //Object.keys() gets all keys and returns keys in an array. You cannot separate properties from methods
console.log(keys);
if ("radius" in circle3) console.log("circle3 has a radius"); //can be used to check if a property is in an object

//Abstraction
function ComplexCircle(radius) {
  this.radius = radius;
  this.defaultLocation = { x: 0, y: 0 };
  this.computeOptimumLocation = function () {}; //this method should be hidden (abstracted) because it is only used inside the object
  this.draw = function () {
    this.computeOptimumLocation();
    console.log("Constructor function draw");
  };
}

//Private Properties & Methods
function ComplexCircleWithLocalVaribles(radius) {
  this.radius = radius;
  let defaultLocation = { x: 0, y: 0 }; //this variable is not accessible outside the object (replace this with let). From an OOP pov it is a private member
  let computeOptimumLocation = function () {}; //this function is not accessible outside the object. From an OOP pov it is a private member
  this.draw = function () {
    computeOptimumLocation();
    defaultLocation; //syntax used to access local variables
    this.radius; //use this to access properties

    console.log("Constructor function draw");
  };
}
//a closure is created when an inner function “remembers” and retains access to variables from its outer (lexical) scope even after the outer function has finished executing.
//a function can access its local variables and variables above its scope

//Getters/Setters (Accessors)
function ComplexCircleWithAccessors(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 }; //not accessible from outside

  this.getDefaultLocation = function () {
    return defaultLocation; //accessible from outside using solution 1
  };

  this.draw = function () {
    console.log("Constructor function draw");
  };

  //use defineProperty method to add a new property/accessors in a constructor function (ie solution 2)
  Object.defineProperty(this, "defaultLocation", {
    get: function () {
      return defaultLocation;
    },
    set: function (value) {
      if (!value.x || !value.y) throw new Error("Invalid location"); //validation

      defaultLocation = value;
    },
  });
}

const cirlce4 = new ComplexCircleWithAccessors(10);
console.log(cirlce4);

//Exercise
function StopWatch(params) {
  let startTime,
    stopTime,
    running,
    duration = 0;
  this.start = function () {
    if (running) throw new Error("Stopwatch has already started!");

    running = true;

    startTime = Date.now();
  };
  this.stop = function () {
    if (!running) throw new Error("Stopwatch has not started!");

    running = false;

    stopTime = Date.now();

    const elapsedTime = (stopTime - startTime) / 1000;
    duration += elapsedTime;
  };
  this.reset = function () {
    startTime = null;
    stopTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: function () {
      return duration;
    },
  });
}

const sw = new StopWatch();
console.log(sw);
