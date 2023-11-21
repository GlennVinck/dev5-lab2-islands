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
    });

    // when btnSave is clicked, call function save()
    document.querySelector("#btnSave").addEventListener("click", () => {
      this.save();
    });

    // when btnLoad is clicked, call function load()
    document.querySelector("#btnLoad").addEventListener("click", () => {
      this.load();
    });

    //remove island when clicked
    document.querySelector("#app").addEventListener("click", (e) => {
      if (e.target.classList.contains("island")) {
        // find the clicked island's DOM element
        const clickedIsland = e.target;
        // find island index in the array on name and color basis
        const index = this.islands.findIndex(
          (island) => island.name === clickedIsland.innerHTML
        );

        new Island().remove();

        clickedIsland.animate(
          [
            { opacity: 1 }, // Start with full opacity
            { opacity: 0 }, // End with completely transparent
          ],
          {
            duration: 1000, // Duration of the animation in milliseconds
            fill: "forwards", // Keep the final style of the animation
          }
        );

        // if the island is found in the array
        if (index !== -1) {
          // remove the island from the array
          setTimeout(() => {
            this.islands.splice(index, 1);
            clickedIsland.remove();
            console.log("Island removed from the array:", this.islands);
          }, 1000);
        }
      }
    });
  }

  save() {
    // save array islands to localstorage as string
    localStorage.setItem("islands", JSON.stringify(this.islands));
  }

  load() {
    //clear the DOM
    document.querySelector("#app").innerHTML = "";
    // load islands from localstorage into array
    // loop over the array and addIslands()
    const islands = JSON.parse(localStorage.getItem("islands"));
    islands.forEach((island) => {
      this.addIsland(island);
    });
  }

  getCoordinates() {
    // return coordinates within the screen at random, feel free to change it up!
    let randomSign = Math.random() < 0.5 ? -1 : 1;
    return {
      x: ((Math.random() * window.innerWidth) / 2) * randomSign ?? 0,
      y: ((Math.random() * window.innerHeight) / 2) * randomSign ?? 0,
    };
  }

  addIsland(island) {
    //create a div with class island
    let div = document.createElement("div");
    div.classList.add("island");
    div.style.backgroundColor = island.color;
    div.innerHTML = island.name;

    // add the islands to the DOM
    document.querySelector("#app").appendChild(div);

    //add island to array
    this.islands.push(island);

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
