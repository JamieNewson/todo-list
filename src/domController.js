import projectController from "./projectController.js";
import toDoController from "./toDoController.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectList");
const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".project-modal");
const newToDoModal = document.querySelector(".toDo-modal");

newProjectBtn.addEventListener("click", (event) => {
  newProjectModal.style.display = "block";
});

const createProjectForm = document.querySelector("#createProjectForm");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newProjectModal.style.display = "none";

  const project = {
    name: document.querySelector("#project-name").value,
    description: document.querySelector("#project-description").value,
  };

  projectController.createProject(project);

  createProjectForm.reset();
});

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    createProjectButton(project);
  }
}

function createProjectButton(project) {
  const newButton = document.createElement("button");

  newButton.innerText = project.name;
  newButton.className = "projectBtn";
  newButton.id = project.id;

  newButton.addEventListener("click", (e) => {
    projectDisplay.innerHTML = "";
    projectDisplay.append(displayProject(e.target.id));
    projectController.setActiveProjectID(e.target.id);
    initialiseToDoList(e.target.id);
    projectDisplay.append(createToDoButton());
  });

  projectList.appendChild(newButton);
}

function displayProject(projectID) {
  const element = document.createElement("div");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  const selectedProject = projectController.getProject(projectID);

  projectTitle.innerText = selectedProject.name;
  projectDescription.innerText = selectedProject.description;

  element.appendChild(projectTitle);
  element.appendChild(projectDescription);

  return element;
}

const createToDoForm = document.querySelector("#createToDoForm");
createToDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newToDoModal.style.display = "none";

  const toDo = {
    name: document.querySelector("#todo-name").value,
    description: document.querySelector("#todo-description").value,
    dueDate: document.querySelector("#todo-due-date").value,
    priority: document.querySelector("#todo-priority").value,
  };
  toDoController.createToDo(toDo);
  displayToDoList(projectController.getActiveProjectID());

  createToDoForm.reset();
});

function createToDoButton() {
  const newToDoBtn = document.createElement("button");
  newToDoBtn.classList = "newElementBtn newToDoBtn";
  newToDoBtn.innerText = "+";

  newToDoBtn.addEventListener("click", (e) => {
    newToDoModal.style.display = "block";
  });

  return newToDoBtn;
}

function initialiseToDoList(projectID) {
  const toDoList = document.createElement("ul");
  toDoList.className = "toDoList";
  projectDisplay.append(toDoList);
  displayToDoList(projectID);
}

function displayToDoList(projectID) {
  const toDoList = document.querySelector(".toDoList");
  const projectToDos = toDoController.getToDos(projectID);

  toDoList.innerHTML = "";

  for (const toDo of projectToDos) {
    toDoList.appendChild(createToDoElement(toDo));
  }

  return toDoList;
}

function createToDoElement(toDo) {
  const toDoElement = document.createElement("li");
  toDoElement.id = toDo.getID();
  toDoElement.innerText = `Name: ${toDo.getName()}, Date: ${toDo.getDueDate()}, Priority: ${toDo.getPriority()}`;
  return toDoElement;
}

export default { displayProjectList, createProjectButton };
