export class Circle {
  #radius;
  constructor(radius) {
    this.#radius = radius;
  }
  draw() {
    console.log(`Circle of radius ${this.#radius}`);
  }
}
