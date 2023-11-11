export default class Island {
  constructor(name) {
    this.name = name || this.getRandomName();
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  remove() {
    // JS animations api, fade out
    // remove the element when the animation ended
  }

  getRandomName() {
    // array with 10 random island names
    const names = [
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Uranus",
      "Jupiter",
      "Saturn",
      "Neptune",
      "Pluto",
    ];

    // return a random name from the array
    return names[Math.floor(Math.random() * names.length)];
  }
}
