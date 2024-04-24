import projectController from "./projectController.js";
import buildElement from "./createElement.js";
import formHandler from "./formHandler.js";
import jsonHandler from "./jsonHandler.js";

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
    return new Date(this.dueDate);
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

function getToDo(toDo) {
  return jsonHandler.fetchToDos().find(({ id }) => id === toDo.id.value);
}

function createToDo(toDo) {
  let newToDo = new ToDo(
    toDo.nameInput.value,
    toDo.descriptionInput.value,
    toDo.dueDateInput.value,
    toDo.priorityInput.value
  );

  jsonHandler.pushNewToDo(newToDo);

  return newToDo;
}

function updateToDo(toDo) {
  const element = getToDo(toDo);

  element.setName(toDo.nameInput.value);
  element.setDescription(toDo.descriptionInput.value);
  element.setDueDate(new Date(toDo.dueDateInput.value));
  element.setPriority(toDo.priorityInput.value);

  jsonHandler.updateToDo(element);

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
    `toDo-header ${toDo.getState() ? "completed" : ""}`
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
  const quickBtns = buildElement.createElementWithClass(
    "span",
    "",
    "quick-btns"
  );
  const toggleStateBtn = buildElement.createElementWithClass(
    "span",
    `${toDo.getState() ? "close" : "done"}`,
    "material-symbols-outlined toggle-state pop-out-btn"
  );
  const deleteBtn = buildElement.createElementWithClass(
    "span",
    "delete",
    "material-symbols-outlined delete-btn pop-out-btn"
  );

  quickBtns.append(toggleStateBtn, deleteBtn);
  toDoHeader.append(toDoTitle, toDoPriority, quickBtns);
  toDoElement.append(toDoHeader, toDoDesc, toDoDueDate);

  toDoElement.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-state"))
      formHandler.displayToDoForm("update", toDo);
  });

  toggleStateBtn.addEventListener("click", (e) => {
    updateToDoState(toDo);
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

function updateToDoState(toDo) {
  toDo.setState();
  const toDoElement = document.getElementById(toDo.getID());

  toDoElement.querySelector(".toDo-header").classList.toggle("completed");
  toDoElement.querySelector(".toggle-state").innerText = `${
    toDo.getState() ? "close" : "done"
  }`;

  jsonHandler.updateToDo(toDo);
}

function getProjectToDos() {
  const activeProjectID = projectController.getActiveProject().getID();
  return jsonHandler
    .fetchToDos()
    .filter((toDo) => toDo.getParentID() === activeProjectID);
}

export default {
  ToDo,
  getProjectToDos,
  createToDo,
  updateToDo,
  createToDoElement,
  updateToDoElement,
};
