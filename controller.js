"use strict";

import Model from "./model.js";
import View from "./view.js";

export default class Controller {
  constructor() {
    this.view = new View(this);
    this.model = new Model();
    this.cannonBall = this.model.randomBall();
  }

  start() {
    this.init();
  }

  init() {
    this.createBalls();
    this.displayBalls(this.model);
    this.getCannonBall();
    this.ballIndex = null;
  }

  shootBall(index) {
    console.log("shootBall");
    this.insertOneBall(index);

    this.getCannonBall();
  }

  insertOneBall(index) {
    let targetNode = this.model.get(index); // Get the node currently at the index
    if (targetNode) {
      this.model.insertAfterNode(this.cannonBall, targetNode); //insert the cannon ball after the target node
    } else {
      if (index === 0 || this.model.head === null) { //if theres no target node, insert at the head
        this.model.add(this.cannonBall);
      } else {
        console.error("Error at index:", index);
      }
    }

    this.displayBalls(this.model); //update the view to reflect the updated model state
    this.getCannonBall(); // use getCannonBall to get a new cannon ball
    this.model.findMatchesAround(targetNode ? targetNode.next : this.model.head); // use findMatches to find any matches around the new ball
    this.displayBalls(this.model); //update view again, if anything is removed
  }

  findMatches(index) {
    let matches = this.model.findMatchesAround(index);
    if (matches.length > 0) {
      console.log("Matches found:", matches);
      this.removeMatches(matches);
    } else {
      console.log("No matches found");
    }
  }

  createBalls() {
    for (let index = 0; index < 5; index++) {
      this.model.add(this.model.randomBall());
    }
    this.model.dump();
  }

  displayBalls(model) {
    let balls = [];
    let i = 0;
    while (model.get(i) != null) {
      balls.push(model.get(i).data);
      i++;
    }
    this.view.displayEntireChain(balls);
  }

  getCannonBall() {
    this.cannonBall = this.model.randomBall();
    this.view.displayCannonBall(this.cannonBall);
  }
}
