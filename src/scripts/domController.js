import projectController from "./projectController.js";
import toDoController from "./toDoController.js";
import buildElement from "./createElement.js";
import formHandler from "./formHandler.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectList");

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    createProjectNavButton(project);
  }
  resetSelection();
  displayProject();
  displayToDoList();
  createToDoButton();
}

function createProjectNavButton(project) {
  const element = buildElement.createElementWithClassAndID(
    "li",
    "",
    "projectBtn",
    project.getID()
  );
  const newButton = buildElement.createElementWithText(
    "span",
    project.getName()
  );
  const icon = buildElement.createElementWithClass(
    "span",
    "folder",
    "projectIcon material-symbols-outlined"
  );

  icon.style.color = project.getColor();

  element.appendChild(icon);
  element.appendChild(newButton);

  element.addEventListener("click", (e) => {
    const targetID = e.target.id ? e.target.id : e.target.parentNode.id;
    projectDisplay.innerHTML = "";
    projectController.setActiveProject(targetID);
    displayProject();
    resetSelection();
    displayToDoList();
    createToDoButton();
  });

  projectList.appendChild(element);
}

function displayProject() {
  const currentProject = projectController.getActiveProject();
  const element = document.createElement("div");

  element.appendChild(
    buildElement.createElementWithText("h2", currentProject.getName())
  );
  element.appendChild(
    buildElement.createElementWithText("p", currentProject.getDescription())
  );

  projectDisplay.append(element);
}

function resetSelection() {
  for (const project of projectList.children) {
    if (project.id != projectController.getActiveProject().getID())
      project.className = "projectBtn";
    else project.classList = "projectBtn selectedBtn";
  }
}

function formatPriority(priority) {
  let priorityString = "!";
  for (let i = 1; i < priority; i++) {
    priorityString += "!";
  }
  return priorityString;
}

function createToDoButton() {
  const newToDoBtn = buildElement.createElementWithClass(
    "button",
    "+",
    "newElementBtn newToDoBtn"
  );

  newToDoBtn.addEventListener("click", (e) => {
    formHandler.displayToDoForm("create");
  });

  projectDisplay.append(newToDoBtn);
}

function displayToDoList() {
  const toDoList = buildElement.createElementWithClass("ul", "", "toDoList");
  const projectToDos = toDoController.getToDos();

  for (const toDo of projectToDos) {
    toDoList.appendChild(createToDoElement(toDo));
  }

  projectDisplay.append(toDoList);
}

function updateToDoList(toDo) {
  const toDoList = document.querySelector(".toDoList");
  toDoList.appendChild(createToDoElement(toDo));
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
    formatPriority(toDo.getPriority()),
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
  const toDoElement = document.getElementById(toDo.getID());
  toDoElement.querySelector(".title").innerText = toDo.getName();
  toDoElement.querySelector(".description").innerText = toDo.getDescription();
  toDoElement.querySelector(".dueDate").innerText = toDo
    .getDueDate()
    .toLocaleDateString();
  toDoElement.querySelector(".priority").innerText = formatPriority(
    toDo.getPriority()
  );
}

export default {
  displayProjectList,
  createProjectNavButton,
  updateToDoList,
  updateToDoElement,
};
