import projectList from "./projects.js";

const projectDisplay = document.querySelector(".projectDisplay");
const buttonList = document.querySelector(".projectButtonList");

const newProjectBtn = document.querySelector(".newProjectBtn");
const newProjectModal = document.querySelector(".modal-box");

newProjectBtn.addEventListener("click", (event) => {
  newProjectModal.style.display = "block";
});

function createProjectButtons() {
  for (const project of projectList.getProjectIDs()) {
    createButton(project);
  }
}

function createButton(project) {
  newProjectModal.style.display = "none";
  const newButton = document.createElement("button");

  newButton.innerText = project.name;
  newButton.clasName = "projectBtn";
  newButton.id = project.id;

  newButton.addEventListener("click", (event) => {
    projectDisplay.innerHTML = "";
    projectDisplay.append(projectList.displayProject(event.target.id));
  });

  buttonList.appendChild(newButton);
}

export default { createProjectButtons, createButton };
