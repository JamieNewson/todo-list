import projectList from "./projects.js";

const projectDisplay = document.querySelector(".projectDisplay");
const buttonList = document.querySelector(".projectButtonList");
const newProjectBtn = document.querySelector(".button");

// newProjectBtn.addEventListener("click", (event) => {});

function createProjectButtons() {
  for (const project of projectList.getProjects()) {
    createButton(project);
  }
}

function createButton(project) {
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
