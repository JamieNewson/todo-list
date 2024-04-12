import { create } from "lodash";
import projectController from "./projectController.js";

class ToDo {
  constructor(parentID, name, description, dueDate, priority) {
    this.id = `todo-${Math.random().toString(16).slice(4)}`;
    this.parentID = parentID;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getID() {
    return this.id;
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

function createToDo(toDo) {
  let newToDo = new ToDo(
    projectController.getActiveProjectID(),
    toDo.name,
    toDo.description,
    toDo.dueDate,
    toDo.priority
  );

  toDos.push(newToDo);
}

function getToDos(inputID) {
  return toDos.filter(({ parentID }) => parentID === inputID);
}

// console.log(
//   `ToDo: ${myToDo.getName()}
// Description: ${myToDo.getDescription()}
// Due Date: ${myToDo.getDueDate().toLocaleDateString("en-gb")}
// Priority: ${myToDo.getPriority()}`
// );

export default { getToDos, createToDo };
