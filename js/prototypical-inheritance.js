//Creating your own Prototypical Inheritance
function Triangle(side, color) {
  Shape.call(this, color); //example of where to use call, apply or bind
  this.side = side;
}
/*Triangle.prototype.duplicate = function () {
  console.log("duplicate");
};*/
Triangle.prototype.draw = function () {
  console.log("draw");
};
//let us imagine we want to create a pentagon object that contains the 'duplicate' method. Instead of repeating the methods;
//1) create a shapeBase object (containing 'duplicate') from the Shape constructor and let the Triangle and Square constructors inherit the duplicate method from shape
function Shape(color) {
  this.color = color;
}
Shape.prototype.duplicate = function () {
  console.log("duplicate"); //added the duplicate method to shapeBase
};
const s = new Shape("blue");
console.log('Shape "s"', s);

//2) in JS, use Object.create() to create an object based on a given prototype
//before we had; triangle => Traingle.prototype => Object.prototype
Triangle.prototype = Object.create(Shape.prototype); //create a new prototype object (triangleBase) with a given prototype. After we have; triangle => Triangle.prototype => Shape.prototype => Object.prototype
const t = new Triangle(1, "red"); //added color after "Calling the Super Constructor section"
console.log('Triangle "t"', t);

//Resetting the Constructor
//3) line 27 resets the triangleBase and the Triangle constructor is lost. To solve it, always reset the triangleBase constructor as best practice
Triangle.prototype.constructor = Triangle;

//Calling the Super Constructor
//NB: modified the shape constructor and added the color parameter for this section*
//in order for the Triangle object to inherit the color property add; Shape.call(this, color); line 3

//Intermediate Function Inheritance
//create another object (pentagon) that inherits from Shape, but refactor to look cleaner by creating an extend (intermediate) function
function Pentagon(side) {
  this.side = side;
}
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype); //set Child to inherit from Parent; number 2 (baseChildObject)
  Child.prototype.constructor = Child; //reset the Child constructor; number 3
}
extend(Pentagon, Shape);
const pn = new Pentagon(2); //has parent members (eg duplicate)
console.log(pn.duplicate());

//Method Overriding
//you can override child methods after extending to have different behaviour for the child method

//Polymorphism
//it can be implemented with method overriding
//it prevents the use of if...else and switch...case statements in procedural programming

//When to use Inheritance
//it can make your code base complex and fragile. Keep things simple
//start with simple objects and use inheritance if they share features
//favour composition/mixins over inheritance

//Mixins
const canEat = {
  eat: function () {
    this.hunger--;
    console.log("eating");
  },
}; //feature 1
const canWalk = {
  walk: function () {
    console.log("walking");
  },
}; //feature 2
const canSwim = {
  swim: function () {
    console.log("swimming");
  },
}; //new feature
//you can use Object.assign() to compose different objects
function Person() {} //define new constructor
Object.assign(Person.prototype, canWalk, canEat); //compose the features

function Goldfish(arams) {} //new object
Object.assign(Goldfish.prototype, canEat, canSwim); //compose new feature and other features
const John = new Person();
const nemo = new Goldfish();
console.log(John, nemo);
//you can refactor with a mixin function
function mixin(target, ...sources) {
  Object.assign(target, ...sources);
}

//Exercise
function HtmlElement() {
  this.click = function (s) {
    console.log("Clicked"); //instance method
  };
}

HtmlElement.prototype.focus = function () {
  console.log("Focused"); //prototype method
};

function HtmlSelectElement(...items) {
  this.items = [...items];
  this.addItem = function (...item) {
    for (const i of item) {
      this.items.push(i);
    }
  };
  this.removeItem = function (item) {
    this.items = this.items.filter((elem) => elem !== item);
  };
}

HtmlSelectElement.prototype = new HtmlElement(); //set the new prototype to an instance so as to access "focus" and "click"
//Extend HtmlSelectElement and implement a render method
HtmlSelectElement.prototype.render = function render() {
  return `
  <select>${this.items
    .map(
      (item) => `
    <option>${item}</option>`
    )
    .join("")}
  </select>`;
};
HtmlSelectElement.prototype.constructor = HtmlSelectElement; //set the new constructor

const selectElem = new HtmlSelectElement();
selectElem.addItem("a", "b", "c"); //test addItem
selectElem.removeItem("b"); //test removeItem
selectElem.focus(); //test focus
selectElem.click(); //test click
console.log(selectElem.render());

//Create a HtmlImageElement that inherits from HtmlElement so it can be clicked and focused but have its own render method (Polymorphism)
function HtmlImageElement(src) {
  this.src = src;
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.render = function render() {
  return `<img src="${this.src}" />`;
};
HtmlImageElement.prototype.constructor = HtmlImageElement;

const imageElem = new HtmlImageElement();
imageElem.focus();
imageElem.click();
// console.log(imageElem.render());

const elements = [
  new HtmlSelectElement(1, 2, 3),
  new HtmlImageElement("http://"),
];

for (const element of elements) {
  console.log(element.render());
}
