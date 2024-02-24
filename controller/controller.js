
import * as model from './model.js';
import * as view from './view/view.js'; 


function updateView() {
    
    let balls = [];
    let currentNode = model.head;
    while (currentNode) {
        balls.push(currentNode.data);
        currentNode = currentNode.next;
    }
    
    view.displayEntireChain(balls);

    
    view.displayCannonBall(model.randomBall());
}


function setupEventListeners() {
    document.querySelector('#chain').addEventListener('click', event => {
        const ballElement = event.target.closest('.ball');
        if (!ballElement) return; 

        const index = Array.from(document.querySelectorAll('#chain .ball')).indexOf(ballElement);
        if (index === -1) return; 

        handleBallButtonClick(index);
    });
}

function handleBallButtonClick(index) {
    const newBallColor = model.randomBall();
    
    const newNode = model.add(newBallColor);
    


    const matchesFound = model.findMatchesAroundNode(newNode); 
    if (matchesFound) {
        model.deleteMatches(matchesFound); 
    }
    
    updateView(); 
}


function initialize() {
    updateView(); 
    setupEventListeners(); 
}


export { initialize };


initialize();
