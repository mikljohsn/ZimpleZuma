export default class View{
  
  constructor(controller){
    this.visualBalls = {
      "🔴": "red-ball.png",
      "🔵": "blue-ball.png",
      "🟡": "yellow-ball.png",
      "🟢": "green-ball.png"
    }
    this.controller = controller;
  }

  displayEntireChain(model) {
    const visualChain = document.querySelector("#chain");
    // remove everything
    visualChain.innerHTML = "";
  
    // iterate through model of balls <- there might be a different way of doing this!
    for(const ball of model) {
      // add ball
      const visualBall = this.createVisualBall(ball);
      visualChain.append(visualBall);
      // add button to click on ball
      this.addButtonTo(visualBall);
    }
  }

  displayCannonBall(ball) {
    const visualCannon = document.querySelector("#cannon");
    visualCannon.innerHTML = "";
    const visualCannonBall = this.createVisualBall(ball);
    visualCannon.append(visualCannonBall);
  }

  createVisualBall(ball) {
    const visualBall = document.createElement("div");
    visualBall.classList.add("ball");
    const image = document.createElement("img");
    image.src = "images/"+ this.visualBalls[ball];
    visualBall.append(image);
    console.log("Creating visual ball for:", ball);
    return visualBall;
  }

  createButton() {
    const button = document.createElement("button");
    button.textContent = "↑";
    return button;
  }

  addButtonTo(visualBall) {
    const button = this.createButton();
    visualBall.append(button);
    // handle click
    button.addEventListener("click", () => {
      // Find the position of this visual ball in the view (the index)
      const index = Array.from(document.querySelectorAll("#chain .ball")).indexOf(visualBall);
      // NOTE: I'm absolutely sure there is a better way!
      
      // notify that we want to insert a ball AFTER this (index)
      console.log("Insert 22 new ball after index: " + index);
      // TODO: Notify controller that we want to insert a new ball here
      this.controller.shootBall(index);
    });
  }

  insertNewBallAfter( index, newBall ) {
    // find the ball at this index (and the button right after)
    const lastVisualBall = document.querySelectorAll("#chain .ball")[index];
    const newVisualBall = this.createVisualBall(newBall);
  
    lastVisualBall.after(newVisualBall);
    console.log(lastVisualBall)
    // add button to ball
    const button = this.createButton();
    newVisualBall.append(button);
  
    return newVisualBall;
  } 

  removeVisualBall( visualBall ) {
    visualBall.remove();
  }
  
  animateExpandSpaceForBall( visualBall ) {
    visualBall.classList.add("expand");
    visualBall.addEventListener("animationend", doneExpanding);
  
    function doneExpanding() {
      visualBall.removeEventListener("animationend", doneExpanding);
      visualBall.classList.remove("expand");
    }
  }

  animateFromCanonBallToFinalPosition( visualBall ) {
    // First: Find the starting position of the ball - which is where the cannonball is
    const source = document.querySelector("#cannon .ball img").getBoundingClientRect();
  
    // Last: Find the destination position of the ball - which is where it has been added
    const image = visualBall.querySelector("img");
    const destination = image.getBoundingClientRect();
  
    // Invert: calculate the distance to move from source to destination
    const deltaX = source.x - destination.x;
    const deltaY = source.y - destination.y;
  
    // Play: run the animation from source to destination
    image.style.setProperty("--delta-x", deltaX + "px");
    image.style.setProperty("--delta-y", deltaY + "px");
    image.classList.add("animatefromcannon");
  
    // Hide the cannonball while animating
    document.querySelector("#cannon .ball img").classList.add("hide");
  
    image.addEventListener("animationend", doneMoving);
  
    function doneMoving() {
      image.removeEventListener("animationend", doneMoving);
      image.classList.remove("animatefromcannon");
      image.style.removeProperty("--delta-x");
      image.style.removeProperty("--delta-y");
  
      document.querySelector("#cannon .ball img").classList.remove("hide");
      // TODO: Notify controller when ball has moved
    }
  }

  animateBallToDisappear( visualBall ) {
    visualBall.classList.add("implode");
    visualBall.addEventListener("animationend", doneDisappearing);
  
    function doneDisappearing() {
      visualBall.classList.remove("implode");
      visualBall.removeEventListener("animationend", doneDisappearing);
      // TODO: Notify controller when ball is gone
    }
  }
}