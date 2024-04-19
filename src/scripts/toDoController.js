import projectController from "./projectController.js";
import domController from "./domController.js";

class ToDo {
  constructor(name, description, dueDate, priority) {
    this.id = `todo-${Math.random().toString(16).slice(4)}`;
    this.parentID = projectController.getActiveProjectID();
    this.name = name;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
  }

  getID() {
    return this.id;
  }

  setParentId(parentId) {
    this.parentId = parentId;
  }
  getParentID() {
    return this.parentID;
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

function createToDo(toDo) {
  let newToDo = new ToDo(
    toDo.name.value,
    toDo.description.value,
    toDo.dueDate.value,
    toDo.priority.value
  );

  toDos.push(newToDo);

  domController.updateToDoList(newToDo);
}

function updateToDo(toDo) {
  const element = toDos.find(({ id }) => id === toDo.id.value);

  element.name = toDo.name.value;
  element.description = toDo.description.value;
  element.dueDate = new Date(toDo.dueDate.value);
  element.priority = toDo.priority.value;

  domController.updateToDoElement(element);
}

function getToDos() {
  return toDos.filter(
    (toDo) => toDo.getParentID() === projectController.getActiveProjectID()
  );
}

export default { getToDos, createToDo, updateToDo };
