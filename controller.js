"use strict";

import  Model  from "./model.js"
import View  from "./view.js";


export default class Controller{
    constructor(){
        this.view = new View(this);
        this.model = new Model();
        this.cannonBall = this.model.randomBall();
     
    }

    start(){
        this.init();
    }

    init(){
        this.createBalls();
        this.displayBalls(this.model);
        this.getCannonBall();
        this.ballIndex = null;
    }

    shootBall(index){
        console.log("shootBall");
        this.insertOneBall(index);

        this.getCannonBall();
    }

    insertOneBall(index) {
        // Assuming the index is where you want to insert the new ball AFTER
        // so if you have [A, B, C] and you insert at index 1, new ball D would be [A, B, D, C]
        let targetNode = this.model.get(index); // Get the node currently at the index
        if (targetNode) {
            // If there's a node at the index, insert the new ball after this node
            this.model.insertAfterNode(this.cannonBall, targetNode);
        } else {
            // If no node is found at the index, it's likely an attempt to insert at the end or an error
            if (index === 0 || this.model.head === null) {
                // If the list is empty or inserting at the start, handle accordingly
                this.model.add(this.cannonBall); // Adjust based on your list's logic, might need to prepend
            } else {
                console.error("Invalid index for insertion:", index);
            }
        }
    
        // Refresh the view to reflect the updated model state
        this.displayBalls(this.model);
        // Prepare the next ball for the cannon
        this.getCannonBall();
        this.findMatches(index)
    }
    
    
    findMatches(index){
        let matches = this.model.findMatchesAround(index);
        if (matches.length > 0){
            console.log("Matches found:", matches);
            this.removeMatches(matches);
        } else {
            console.log("No matches found");
        }
    }

    createBalls(){
        for (let index = 0; index < 5; index++) {
            this.model.add(this.model.randomBall());
        }
        this.model.dump();
    }
    
    displayBalls(model){
        let balls = [];
        let i = 0; 
        while (model.get(i) != null){
            balls.push(model.get(i).data);
            i++;
        }
        this.view.displayEntireChain(balls);
    }

    getCannonBall(){
        this.cannonBall = this.model.randomBall();
        this.view.displayCannonBall(this.cannonBall);
    }
    
}