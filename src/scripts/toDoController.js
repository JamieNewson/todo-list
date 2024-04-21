import projectController from "./projectController.js";
import domController from "./domController.js";

class ToDo {
  constructor(name, description, dueDate, priority) {
    this.id = `todo-${Math.random().toString(16).slice(4)}`;
    this.parentID = projectController.getActiveProject().getID();
    this.name = name;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
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
  setPriority(priority) {
    this.priority = priority;
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

  domController.updateToDoList(newToDo);
}

function updateToDo(toDo) {
  const element = toDos.find(({ id }) => id === toDo.id.value);

  element.setName(toDo.nameInput.value);
  element.setDescription(toDo.descriptionInput.value);
  element.setDueDate(new Date(toDo.dueDateInput.value));
  element.setPriority(toDo.priorityInput.value);

  domController.updateToDoElement(element);
}

function getToDos() {
  return toDos.filter(
    (toDo) =>
      toDo.getParentID() === projectController.getActiveProject().getID()
  );
}

export default { getToDos, createToDo, updateToDo };
