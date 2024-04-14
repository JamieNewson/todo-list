import projectController from "./projectController.js";
import toDoController from "./toDoController.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectList");
const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".project-modal");
const newToDoModal = document.querySelector(".toDo-modal");

newProjectBtn.addEventListener("click", (e) => {
  newProjectModal.style.display = "block";
});

const createProjectForm = document.querySelector("#createProjectForm");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = document.querySelector("#project-name");
  const projectDescription = document.querySelector("#project-description");
  const projectColor = document.querySelector("#project-color");

  if (validateProject(projectName, projectDescription)) {
    newProjectModal.style.display = "none";

    projectController.createProject(
      projectName.value,
      projectDescription.value,
      projectColor.value
    );

    createProjectForm.reset();
  }
});
createProjectForm.addEventListener("reset", (e) => {
  newProjectModal.style.display = "none";
});

function validateProject(name, description) {
  let isValid = true;
  if (name.value.length < 3 || name.value.length > 20) {
    name.className = "invalid";
    isValid = false;
  }
  if (description.value.length > 40) {
    description.className = "invalid";
    isValid = false;
  }
  return isValid;
}

function displayProjectList() {
  for (const project of projectController.getProjectList()) {
    createProjectButton(project);
    if (project.getID() === projectController.getActiveProjectID()) {
      resetSelection();
      displayProject(project.getID());
    }
  }
}

function createProjectButton(project) {
  const element = document.createElement("div");
  const newButton = document.createElement("span");
  const icon = document.createElement("span");

  element.className = "projectBtn";
  element.id = project.getID();
  newButton.innerText = project.getName();

  icon.innerText = "folder";
  icon.classList = "projectIcon material-symbols-outlined";
  icon.style.color = project.getColor();

  element.appendChild(icon);
  element.appendChild(newButton);

  element.addEventListener("click", (e) => {
    const targetID = e.target.id ? e.target.id : e.target.parentNode.id;
    projectDisplay.innerHTML = "";
    displayProject(targetID);
    projectController.setActiveProjectID(targetID);
    projectDisplay.append(createToDoButton());
    resetSelection();
    initialiseToDoList(targetID);
  });

  projectList.appendChild(element);
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

  projectDisplay.append(element);
}

function resetSelection() {
  for (const project of projectList.children) {
    if (project.id != projectController.getActiveProjectID())
      project.className = "projectBtn";
    else project.classList = "projectBtn selectedBtn";
  }
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
createToDoForm.addEventListener("reset", (e) => {
  newToDoModal.style.display = "none";
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
