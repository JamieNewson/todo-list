import projectController from "./projectController.js";
import toDoController from "./toDoController.js";
import { validateProject, validateToDo } from "./inputValidation";

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

function displayToDoForm(method, toDo) {
  displayButtons(method);
  if (method == "update") populateForm(toDo);
  else getInputs().dueDateInput.value = new Date().toISOString().split("T")[0];
  toDoModal.style.display = "block";
}

function displayButtons(method) {
  document.querySelector("#create").style.display =
    method === "create" ? "block" : "none";
  document.querySelector("#update").style.display =
    method === "update" ? "block" : "none";
}

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

function clearForm(modal, e) {
  for (const input of e.target)
    if (input.className === "invalid") input.className = "";
  modal.style.display = "none";
}

export default { displayToDoForm };
