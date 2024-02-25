"use strict";

export default class Model{
  constructor(){
    this.head = null;
    this.tail = null;
  
  }

  dump() {
    let node = this.head;
    let output = "";
    while(node != null) {
      output += '"' + node.data + '"';
      output += " -> ";
     
      node = node.next;
    }
    output += "null";
    console.log(output);
  }

  randomBall() {
    const balls = ["🔴", "🔵","🟡","🟢"]
    return balls[Math.floor(Math.random()*balls.length)];
  }

  add( data ) {
    const node = {data: data, next: null, prev: this.tail};
    if( this.head == null ) {
      // this is the first (and only) node
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return node;
  }

  get( index ) {
    let node = this.head;
    while(index > 0) {
      node = node.next;
      index--;
    }
    return node;
  }

  insertBeforeNode(data, existingNode) {
    const newNode = { data: data, next: existingNode, prev: null };
    if (existingNode) {
        newNode.prev = existingNode.prev;
        if (existingNode.prev) {
            existingNode.prev.next = newNode;
        } else {
            // This is the first node
            this.head = newNode;
        }
        existingNode.prev = newNode;
    } else {
        // If existingNode is null, handle as a special case (e.g., append to end or handle error)
        console.error("existingNode is null, insertion failed.");
        // Implement appropriate fallback logic here, such as appending to the end if that's intended
    }
    return newNode;
}

  
  /* insertBeforeNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode, prev: existingNode.prev};
    // TODO: Doesn't handle if this is the first node
    if (existingNode.prev == null){
      this.head = newNode;
      newNode.prev = null;
      existingNode.prev = newNode;
    } else {
    existingNode.prev.next = newNode;
    existingNode.prev = newNode;
    }
  
    return newNode;
  } */

  insertAfterNode( data, existingNode ) {
    const newNode = { data: data, next: existingNode.next, prev: existingNode};
    // TODO: Doesn't handle if this is the last node
    if (existingNode.next == null){
      this.tail = newNode;
      newNode.next = null;
      existingNode.next = newNode;
    } else {
    existingNode.next.prev = newNode;
    existingNode.next = newNode;
    }
  
    return newNode;
  }

  removeNode( existingNode ) {
    const prev = existingNode.prev;
    const next = existingNode.next;
  
    if(prev == null) {
      // this is the first node - make head point to the next one
      this.head = existingNode.next;
      // and make this one point back to nothing
      if(this.head)
      this.head.prev = null;
    } 
    
    if(next == null) {
      // this is the last node - make tail point to the one before
      this.tail = existingNode.prev;
      if(this.tail)
      this.tail.next = null;
    }
  
    if(existingNode.prev)
      existingNode.prev.next = existingNode.next;
    if(existingNode.next)
      existingNode.next.prev = existingNode.prev;
  }

  findMatchesAround(node){
    let matches = [];
    matches.push(node);
    // go left until we find a different color
    let before = node.prev;
    while(before != null && before.data == node.data) {
      matches.push(before);
      before = before.prev;
    }
  
    // go right until we find a different color
    let after = node.next;
    while(after != null && after.data == node.data) {
      matches.push(after);
      after = after.next;
    }
  
    console.log(matches)
    
    if(matches.length >= 3) {
      matches.forEach( node => {
        this.removeNode(node);
      });
      this.dump();
    
    }
  }
}

