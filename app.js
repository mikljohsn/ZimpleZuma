import  Controller from './controller.js';

window.addEventListener("load", startGame);

function startGame() {
    console.log("JS is running");
    let controller = new Controller();
    controller.start();
}