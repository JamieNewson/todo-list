import projectController from "./projectController.js";
import toDoController from "./toDoController.js";
import buildElement from "./createElement.js";
import { validateProject, validateToDo } from "./inputValidation";

const projectDisplay = document.querySelector(".projectDisplay");
const projectList = document.querySelector(".projectList");
const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".project-modal");
const toDoModal = document.querySelector(".toDo-modal");

newProjectBtn.addEventListener("click", (e) => {
  newProjectModal.style.display = "block";
});

const createProjectForm = document.querySelector("#createProjectForm");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProject = {
    nameInput: document.querySelector("#project-name"),
    descriptionInput: document.querySelector("#project-description"),
    colorInput: document.querySelector("#project-color"),
  };

  if (!validateProject(newProject)) return;

  projectController.createProject(newProject);
  createProjectForm.reset();
});

createProjectForm.addEventListener("reset", (e) => {
  clearForm(newProjectModal, e);
});

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

const toDoForm = document.querySelector("#toDoForm");
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newToDo = getInputs();

  if (!validateToDo(newToDo)) return;

  if (e.submitter.id == "create") toDoController.createToDo(newToDo);
  else toDoController.updateToDo(newToDo);

  toDoForm.reset();
});
toDoForm.addEventListener("reset", (e) => {
  clearForm(toDoModal, e);
});

function getInputs() {
  return {
    id: document.querySelector("#todo-id"),
    nameInput: document.querySelector("#todo-name"),
    descriptionInput: document.querySelector("#todo-description"),
    dueDateInput: document.querySelector("#todo-due-date"),
    priorityInput: document.querySelector("#todo-priority"),
    createBtn: document.querySelector("#create"),
    updateBtn: document.querySelector("#update"),
  };
}

function populateForm(toDo) {
  const input = getInputs();

  input.id.value = toDo.getID();
  input.nameInput.value = toDo.getName();
  input.descriptionInput.value = toDo.getDescription();
  input.dueDateInput.value = toDo.getDueDate().toISOString().split("T")[0];
  input.priorityInput.value = toDo.getPriority();
}

function displayButtons(method) {
  document.querySelector("#create").style.display =
    method === "create" ? "block" : "none";
  document.querySelector("#update").style.display =
    method === "update" ? "block" : "none";
}

function formatPriority(priority) {
  let priorityString = "!";
  for (let i = 1; i < priority; i++) {
    priorityString += "!";
  }
  return priorityString;
}

function createToDoButton() {
  const newToDoBtn = document.createElement("button");
  newToDoBtn.classList = "newElementBtn newToDoBtn";
  newToDoBtn.innerText = "+";

  newToDoBtn.addEventListener("click", (e) => {
    displayButtons("create");
    getInputs().dueDateInput.value = new Date().toISOString().split("T")[0];
    toDoModal.style.display = "block";
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
  toDoPriority.innerText = formatPriority(toDo.getPriority());
  toDoDesc.innerText = toDo.getDescription();
  toDoDueDate.innerText = toDo.getDueDate().toLocaleDateString();

  toDoHeader.append(toDoTitle, toDoPriority);
  toDoElement.append(toDoHeader, toDoDesc, toDoDueDate);

  toDoElement.addEventListener("click", () => {
    displayButtons("update");
    populateForm(toDo);
    toDoModal.style.display = "block";
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

function clearForm(modal, e) {
  for (const input of e.target)
    if (input.className === "invalid") input.className = "";
  modal.style.display = "none";
}

export default {
  displayProjectList,
  createProjectButton: createProjectNavButton,
  updateToDoList,
  updateToDoElement,
};
