import projectController from "./projectController.js";
import toDoController from "./toDoController.js";

const projectList = document.querySelector(".projectList");
const projectDisplayHeader = document.querySelector(".project-display-header");
const toDoList = document.querySelector(".toDoList");

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    projectList.appendChild(projectController.createProjectNavButton(project));
  }
  displayActiveProject();
  displayToDoList();
  resetSelection();
}

function updateProjectList(project) {
  projectList.appendChild(projectController.createProjectNavButton(project));
}

function displayActiveProject() {
  const currentProject = projectController.getActiveProject();

  projectDisplayHeader.querySelector("h2").innerText = currentProject.getName();
  projectDisplayHeader.querySelector("p").innerText =
    currentProject.getDescription();
}

function handleNav(e) {
  const targetID = e.target.id ? e.target.id : e.target.parentNode.id;
  projectController.setActiveProject(targetID);
  displayActiveProject();
  displayToDoList();
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
  const projectToDos = toDoController.getToDos();

  toDoList.innerHTML = "";
  for (const toDo of projectToDos) {
    toDoList.appendChild(toDoController.createToDoElement(toDo));
  }
}

function updateToDoList(toDo) {
  toDoList.appendChild(toDoController.createToDoElement(toDo));
}

export default {
  displayProjectList,
  handleNav,
  updateProjectList,
  updateToDoList,
};
