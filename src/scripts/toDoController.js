import projectController from "./projectController.js";
import buildElement from "./createElement.js";
import formHandler from "./formHandler.js";

class ToDo {
  constructor(name, description, dueDate, priority) {
    this.id = `todo-${Math.random().toString(16).slice(4)}`;
    this.parentID = projectController.getActiveProject().getID();
    this.name = name;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.isComplete = false;
  }

  getID() {
    return this.id;
  }

  getParentID() {
    return this.parentID;
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
    this.description = description;
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
  getFormattedPriority() {
    let priorityString = "!";
    for (let i = 1; i < this.priority; i++) {
      priorityString += "!";
    }
    return priorityString;
  }
  setPriority(priority) {
    this.priority = priority;
  }

  getState() {
    return this.isComplete;
  }
  setState() {
    this.isComplete = !this.isComplete;
  }
}

let toDos = [];

function createToDo(toDo) {
  let newToDo = new ToDo(
    toDo.nameInput.value,
    toDo.descriptionInput.value,
    toDo.dueDateInput.value,
    toDo.priorityInput.value
  );

  toDos.push(newToDo);

  return newToDo;
}

function updateToDo(toDo) {
  const element = toDos.find(({ id }) => id === toDo.id.value);

  element.setName(toDo.nameInput.value);
  element.setDescription(toDo.descriptionInput.value);
  element.setDueDate(new Date(toDo.dueDateInput.value));
  element.setPriority(toDo.priorityInput.value);

  return element;
}

function createToDoElement(toDo) {
  const toDoElement = buildElement.createElementWithClassAndID(
    "li",
    "",
    "toDo-element",
    toDo.getID()
  );
  const toDoHeader = buildElement.createElementWithClass(
    "div",
    "",
    "toDo-header"
  );
  const toDoTitle = buildElement.createElementWithClass(
    "h3",
    toDo.getName(),
    "title"
  );
  const toDoPriority = buildElement.createElementWithClass(
    "span",
    toDo.getFormattedPriority(),
    "priority"
  );
  const toDoDesc = buildElement.createElementWithClass(
    "p",
    toDo.getDescription(),
    "description"
  );
  const toDoDueDate = buildElement.createElementWithClass(
    "p",
    toDo.getDueDate().toLocaleDateString(),
    "dueDate"
  );

  toDoHeader.append(toDoTitle, toDoPriority);
  toDoElement.append(toDoHeader, toDoDesc, toDoDueDate);

  toDoElement.addEventListener("click", () => {
    formHandler.displayToDoForm("update", toDo);
  });

  return toDoElement;
}

function updateToDoElement(toDo) {
  const updatedToDo = updateToDo(toDo);

  const toDoElement = document.getElementById(updatedToDo.getID());
  toDoElement.querySelector(".title").innerText = updatedToDo.getName();
  toDoElement.querySelector(".description").innerText =
    updatedToDo.getDescription();
  toDoElement.querySelector(".dueDate").innerText = updatedToDo
    .getDueDate()
    .toLocaleDateString();
  toDoElement.querySelector(".priority").innerText =
    updatedToDo.getFormattedPriority();
}

function getToDos() {
  return toDos.filter(
    (toDo) =>
      toDo.getParentID() === projectController.getActiveProject().getID()
  );
}

export default {
  getToDos,
  createToDo,
  updateToDo,
  createToDoElement,
  updateToDoElement,
};
