import Island from "./Island.js";

export default class World {
  constructor() {
    this.islands = []; // a good place to keep track of your islands
    this.hookEvents(); // let's kick things of by hooking up events
  }

  hookEvents() {
    // hook events like clicking buttons to a specific function
    document.querySelector("#btnAddIsland").addEventListener("click", () => {
      const island = new Island();
      this.addIsland(island);
      console.log("click 1");
    });

    document.querySelector("#btnSave").onclick = function () {
      console.log("click 2");
    };

    document.querySelector("#btnLoad").onclick = function () {
      console.log("click 3");
    };
  }

  save() {
    // save array islands to localstorage as string
    // loop over all this.islands and save the names
  }

  load() {
    // load islands from localstorage into array
    // loop over the array and addIslands()
  }

  getCoordinates() {
    // return coordinates within the screen at random, feel free to change it up!
    let randomSign = Math.random() < 0.5 ? -1 : 1;
    return {
      x: ((Math.random() * window.innerWidth) / 2) * randomSign,
      y: ((Math.random() * window.innerHeight) / 2) * randomSign,
    };
  }

  addIsland(island) {
    //get random color
    //get random name
    const color = island.getRandomColor();
    const name = island.getRandomName();

    //create a div with class island
    let div = document.createElement("div");
    div.classList.add("island");
    div.style.backgroundColor = color;
    div.innerHTML = name;

    // add the islands to the DOM
    document.querySelector("#app").appendChild(div);

    //add island to array
    this.islands.push(island);
    console.log(this.islands);

    //move island to random position
    this.moveIsland(div);
  }

  moveIsland(island) {
    //animate the islands to the coordinates
    //use the JS animations API
    const coordinates = this.getCoordinates();
    island.animate(
      [
        // keyframes
        { transform: "translate(0, 0)" },
        { transform: `translate(${coordinates.x}px, ${coordinates.y}px)` },
      ],
      {
        // timing options
        duration: 1000,
        iterations: 1,
        fill: "forwards",
      }
    );
  }
}
