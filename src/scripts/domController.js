import projectController from "./projectController.js";
import toDoController from "./toDoController.js";
import buildElement from "./createElement.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectList");

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    projectList.appendChild(projectController.createProjectNavButton(project));
  }
  projectDisplay.append(
    displayActiveProject(),
    displayToDoList(),
    toDoController.createToDoButton()
  );
  resetSelection();
}

function updateProjectList(project) {
  projectList.appendChild(projectController.createProjectNavButton(project));
}

function displayActiveProject() {
  const currentProject = projectController.getActiveProject();
  const element = document.createElement("div");

  element.appendChild(
    buildElement.createElementWithText("h2", currentProject.getName())
  );
  element.appendChild(
    buildElement.createElementWithText("p", currentProject.getDescription())
  );

  return element;
}

function handleNav(e) {
  const targetID = e.target.id ? e.target.id : e.target.parentNode.id;
  projectController.setActiveProject(targetID);
  projectDisplay.innerHTML = "";
  projectDisplay.append(
    displayActiveProject(),
    displayToDoList(),
    toDoController.createToDoButton()
  );
  resetSelection();
}

function resetSelection() {
  for (const project of projectList.children) {
    if (project.id != projectController.getActiveProject().getID())
      project.className = "projectBtn";
    else project.classList = "projectBtn selectedBtn";
  }
}

function displayToDoList() {
  const toDoList = buildElement.createElementWithClass("ul", "", "toDoList");
  const projectToDos = toDoController.getToDos();

  for (const toDo of projectToDos) {
    toDoList.appendChild(toDoController.createToDoElement(toDo));
  }

  return toDoList;
}

function updateToDoList(toDo) {
  const toDoList = document.querySelector(".toDoList");
  toDoList.appendChild(toDoController.createToDoElement(toDo));
}

function updateToDoElement(toDo) {
  const toDoElement = document.getElementById(toDo.getID());
  toDoElement.querySelector(".title").innerText = toDo.getName();
  toDoElement.querySelector(".description").innerText = toDo.getDescription();
  toDoElement.querySelector(".dueDate").innerText = toDo
    .getDueDate()
    .toLocaleDateString();
  toDoElement.querySelector(".priority").innerText =
    toDo.getFormattedPriority();
}

export default {
  displayProjectList,
  updateProjectList,
  handleNav,
  updateToDoList,
  updateToDoElement,
};
