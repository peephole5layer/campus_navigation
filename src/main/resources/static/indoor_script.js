const graph = {
  // Floor 0
  "Room 101": ["Room 102"],
  "Room 102": ["Room 101", "Room 103"],
  "Room 103": ["Room 102", "Seminar Hall A"],
  "Seminar Hall A": ["Room 103", "Washroom A", "Stairs 0"],
  "Washroom A": ["Seminar Hall A"],
  "Stairs 0": ["Seminar Hall A", "Stairs 1"],

  // Floor 1
  "Stairs 1": ["Stairs 0", "Stairs 2", "Lab 4", "Room 203"],
  "Lab 4": ["Stairs 1", "Room 201"],
  "Room 201": ["Lab 4", "Room 202"],
  "Room 202": ["Room 201", "Room 203"],
  "Room 203": ["Room 202", "Stairs 1"],

  // Floor 2
  "Stairs 2": ["Stairs 1", "Stairs 3", "Lab 5"],
  "Lab 5": ["Stairs 2", "Room 301"],
  "Room 301": ["Lab 5", "Room 302"],
  "Room 302": ["Room 301", "Room 303"],
  "Room 303": ["Room 302", "Washroom B"],
  "Washroom B": ["Room 303", "Stairs 2"],

  // Floor 3
  "Stairs 3": ["Stairs 2", "Room 401"],
  "Room 401": ["Stairs 3", "Room 402"],
  "Room 402": ["Room 401", "Room 403"],
  "Room 403": ["Room 402", "Washroom girls"],
  "Washroom girls": ["Room 403"]
};


const allRooms = Object.keys(graph);

const floorMap = {
  "Floor 0": ["Room 101", "Room 102", "Room 103", "Seminar Hall A", "Washroom A", "Stairs 0"],
  "Floor 1": ["Room 201", "Room 202", "Room 203", "Lab 4", "Stairs 1"],
  "Floor 2": ["Room 301", "Room 302", "Room 303", "Lab 5", "Washroom B", "Stairs 2"],
  "Floor 3": ["Room 401", "Room 402", "Room 403", "Washroom girls", "Stairs 3"]
};

const sourceSelect = document.getElementById("source");
const destSelect = document.getElementById("destination");
const floorContainer = document.getElementById("floors");

function populateDropdowns() {
  allRooms.forEach(room => {
    const option1 = document.createElement("option");
    option1.value = room;
    option1.textContent = room;
    sourceSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = room;
    option2.textContent = room;
    destSelect.appendChild(option2);
  });
}

function bfsPath(start, end) {
  let queue = [[start]];
  let visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node] || []) {
        let newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }
  return null;
}

function renderFloors(path = []) {
  floorContainer.innerHTML = "";
  for (const floor in floorMap) {
    const div = document.createElement("div");
    div.className = "floor";
    div.innerHTML = `<h3>${floor}</h3>`;

    floorMap[floor].forEach(room => {
      const span = document.createElement("div");
      span.className = "room";
      span.textContent = room;
      if (path.includes(room)) {
        span.classList.add("path");
      }
      div.appendChild(span);
    });

    floorContainer.appendChild(div);
  }
}

function showPath() {
  const source = sourceSelect.value;
  const dest = destSelect.value;

  if (!source || !dest) {
    alert("Please select both source and destination");
    return;
  }

  const path = bfsPath(source, dest);
  if (!path) {
    alert("No path found.");
    return;
  }

  renderFloors(path);
}

populateDropdowns();
renderFloors();

