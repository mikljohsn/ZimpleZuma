"use strict";

let head = null;
let tail = null;

function dump() {
  let node = head;
  let output = "";
  while (node != null) {
    output += '"' + node.data + '"';
    output += " -> ";

    node = node.next;
  }
  output += "null";
  console.log(output);
}

function randomBall() {
  const balls = ["🔴", "🔵", "🟡", "🟢"];
  return balls[Math.floor(Math.random() * balls.length)];
}

function add(data) {
  const node = { data: data, next: null, prev: tail };
  if (head == null) {
    // this is the first (and only) node
    head = node;
    tail = node;
  } else {
    tail.next = node;
    tail = node;
  }
  return node;
}

function get(index) {
  let node = head;
  while (index > 0) {
    node = node.next;
    index--;
  }
  return node;
}

function insertBeforeNode(data, existingNode) {
  const newNode = { data: data, next: existingNode, prev: existingNode.prev };
  // TODO: Doesn't handle if this is the first node
  existingNode.prev.next = newNode;
  existingNode.prev = newNode;

  return newNode;
}

function insertAfterNode(data, existingNode) {
  const newNode = { data: data, next: existingNode.next, prev: existingNode };
  // TODO: Doesn't handle if this is the last node
  existingNode.next.prev = newNode;
  existingNode.next = newNode;

  return newNode;
}

function removeNode(existingNode) {
  const prev = existingNode.prev;
  const next = existingNode.next;

  if (prev == null) {
    // this is the first node - make head point to the next one
    head = existingNode.next;
    // and make this one point back to nothing
    if (head) head.prev = null;
  }

  if (next == null) {
    // this is the last node - make tail point to the one before
    tail = existingNode.prev;
    if (tail) tail.next = null;
  }

  if (existingNode.prev) existingNode.prev.next = existingNode.next;
  if (existingNode.next) existingNode.next.prev = existingNode.prev;
}

function findMatchesAroundNode(node) {
  const matches = [node];

  //go prev/left until different color
  let before = node; //look at the node itself
  while (before.prev !== null && before.prev.data === node.data) {
    //look at the previous node and check if it's the same color
    //adds the previous node to the matches array
    matches.push(before.prev);
    before = before.prev;
  }
  let after = node; //look at the node itself
  while (after.next !== null && after.next.data === node.data) {
    //look at the next node and check if it's the same color
    //adds the next node to the matches array
    matches.push(after.next);
    after = after.next;
  }
  console.log("before", before);
  console.log("after", after);
  console.log("matches", matches);
  return matches;
}

function deleteMatches(matches) {
  matches.forEach(node => removeNode(node));
}


//matches.foreach(node => removeNode(node)); //remove all the nodes in the matches array
add("🟡");
add("🟡");
add("🟢");
add("🟢");
add("🔴");
