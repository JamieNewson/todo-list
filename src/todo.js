import projects from "./projectController.js";

class ToDo {
  constructor(parentID, name, description, dueDate, priority) {
    this.id = `todo-${Math.random().toString(16).slice(4)}`;
    this.parentID = parentID;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setParentId(parentId) {
    this.parentId = parentId;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = this.description;
  }

  getDueDate() {
    return this.dueDate;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getPriority() {
    return this.priority;
  }
  setPriority(priority) {
    this.priority = this.priority;
  }
}

let toDos = [];

const createToDoForm = document.querySelector("#createToDoForm");
createToDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#todo-name");
  let description = document.querySelector("#todo-description");
  let dueDate = document.querySelector("#todo-due-date");
  let priority = document.querySelector("#todo-priority");

  let newToDo = new ToDo(
    projects.getActiveProjectID(),
    name.value,
    description.value,
    dueDate.value,
    priority.description
  );

  toDos.push(newToDo);

  createToDoForm.reset();
});

function displayToDos(inputID) {
  const toDoList = document.createElement("ul");
  const projectToDos = toDos.filter(({ parentID }) => parentID === inputID);

  for (const toDo of projectToDos) {
    const toDoElement = document.createElement("li");
    toDoElement.innerText = `Name: ${toDo.getName()}, Date: ${toDo.getDueDate()}, Priority: ${toDo.getPriority()}`;
    toDoList.appendChild(toDoElement);
  }
  return toDoList;
}

// console.log(
//   `ToDo: ${myToDo.getName()}
// Description: ${myToDo.getDescription()}
// Due Date: ${myToDo.getDueDate().toLocaleDateString("en-gb")}
// Priority: ${myToDo.getPriority()}`
// );

export default { displayToDos };
