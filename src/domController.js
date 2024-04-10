import projectList from "./projects.js";

const projectDisplay = document.querySelector(".projectDisplay");
const buttonList = document.querySelector(".projectButtonList");

const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".project-modal");

const newToDoModal = document.querySelector(".toDo-modal");

newProjectBtn.addEventListener("click", (event) => {
  newProjectModal.style.display = "block";
});

function createProjectButtons() {
  for (const project of projectList.getProjectIDs()) {
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
    projectDisplay.append(projectList.displayProject(e.target.id));
    projectDisplay.append(createNewToDoButton());
  });

  buttonList.appendChild(newButton);
}

function createNewToDoButton() {
  const newToDoBtn = document.createElement("button");
  newToDoBtn.classList = "newElementBtn newToDoBtn";
  newToDoBtn.innerText = "+";

  newToDoBtn.addEventListener("click", (e) => {
    newToDoModal.style.display = "block";
  });

  return newToDoBtn;
}

export default { createProjectButtons, createProjectButton };
