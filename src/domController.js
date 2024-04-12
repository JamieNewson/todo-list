import projectController from "./projectController.js";
import toDoList from "./todo.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectButtonList");
const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".project-modal");
const newToDoModal = document.querySelector(".toDo-modal");

newProjectBtn.addEventListener("click", (event) => {
  newProjectModal.style.display = "block";
});

const createProjectForm = document.querySelector("#createProjectForm");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#project-name");
  let description = document.querySelector("#project-description");

  projectController.createProject(name.value, description.value);

  createProjectForm.reset();
});

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    createProjectButton(project);
  }
}

function createProjectButton(project) {
  newProjectModal.style.display = "none";
  const newButton = document.createElement("button");

  newButton.innerText = project.name;
  newButton.className = "projectBtn";
  newButton.id = project.id;

  newButton.addEventListener("click", (e) => {
    projectDisplay.innerHTML = "";
    projectDisplay.append(displayProject(e.target.id));
    projectDisplay.append(toDoList.displayToDos(e.target.id));
    projectController.setActiveProjectID(e.target.id);
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

function createToDoButton() {
  const newToDoBtn = document.createElement("button");
  newToDoBtn.classList = "newElementBtn newToDoBtn";
  newToDoBtn.innerText = "+";

  newToDoBtn.addEventListener("click", (e) => {
    newToDoModal.style.display = "block";
  });

  return newToDoBtn;
}

export default { displayProjectList, createProjectButton };
