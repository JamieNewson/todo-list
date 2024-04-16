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
  clearForm(newProjectModal, e);
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
  }
  resetSelection();
  displayProject();
  displayToDoList();
  createToDoButton();
}

function createProjectButton(project) {
  const element = document.createElement("li");
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
    projectController.setActiveProjectID(targetID);
    displayProject();
    resetSelection();
    displayToDoList();
    createToDoButton();
  });

  projectList.appendChild(element);
}

function displayProject(projectID = projectController.getActiveProjectID()) {
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

  const toDo = {
    name: document.querySelector("#todo-name"),
    description: document.querySelector("#todo-description"),
    dueDate: document.querySelector("#todo-due-date"),
    priority: document.querySelector("#todo-priority"),
  };

  if (validateToDo(toDo.name, toDo.description, toDo.dueDate)) {
    newToDoModal.style.display = "none";

    toDoController.createToDo(toDo);

    createToDoForm.reset();
  }
});
createToDoForm.addEventListener("reset", (e) => {
  clearForm(newToDoModal, e);
});

function validateToDo(name, description, dueDate) {
  let isValid = true;
  const currentDate = new Date().toLocaleDateString("fr-ca");
  if (name.value.length < 3 || name.value.length > 20) {
    name.className = "invalid";
    isValid = false;
  }
  if (description.value.length > 40) {
    description.className = "invalid";
    isValid = false;
  }
  if (dueDate.value < currentDate) {
    dueDate.className = "invalid";
    isValid = false;
  }
  return isValid;
}

function createToDoButton() {
  const newToDoBtn = document.createElement("button");
  newToDoBtn.classList = "newElementBtn newToDoBtn";
  newToDoBtn.innerText = "+";

  newToDoBtn.addEventListener("click", (e) => {
    newToDoModal.style.display = "block";
  });

  projectDisplay.append(newToDoBtn);
}

function displayToDoList() {
  const toDoList = document.createElement("ul");
  const projectToDos = toDoController.getToDos();

  toDoList.className = "toDoList";
  toDoList.innerHTML = "";

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
  const toDoElement = document.createElement("li");
  const toDoHeader = document.createElement("div");
  const toDoTitle = document.createElement("h3");
  const toDoPriority = document.createElement("span");
  const toDoDesc = document.createElement("p");
  const toDoDueDate = document.createElement("p");

  toDoElement.id = toDo.getID();

  toDoElement.className = "toDo-element";
  toDoHeader.className = "toDo-header";
  toDoTitle.className = "title";
  toDoPriority.className = "priority";
  toDoDesc.className = "description";
  toDoDueDate.className = "dueDate";

  toDoTitle.innerText = toDo.getName();
  toDoPriority.innerText = "!!!";
  toDoDesc.innerText = toDo.getDescription();
  toDoDueDate.innerText = toDo.getDueDate();

  toDoHeader.append(toDoTitle, toDoPriority);
  toDoElement.append(toDoHeader, toDoDesc, toDoDueDate);

  return toDoElement;
}

function clearForm(modal, e) {
  for (const input of e.target)
    if (input.className === "invalid") input.className = "";
  modal.style.display = "none";
}

export default { displayProjectList, createProjectButton, updateToDoList };
