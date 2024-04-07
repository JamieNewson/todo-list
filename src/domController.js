import projectList from "./projects.js";

const projectDisplay = document.querySelector(".projectDisplay");
const projectNav = document.querySelector(".projectNav");
const newProjectBtn = document.querySelector(".button");

// newProjectBtn.addEventListener("click", (event) => {});

export default function createProjectButtons() {
  projectNav.innerHTML = "";
  const projectButtonList = document.createElement("ul");
  for (const element of projectList.getProjects()) {
    const newButton = document.createElement("button");

    newButton.innerText = element.name;
    newButton.clasName = "projectBtn";
    newButton.id = element.id;

    newButton.addEventListener("click", (event) => {
      projectDisplay.innerHTML = "";
      projectDisplay.append(projectList.displayProject(event.target.id));
    });

    projectButtonList.appendChild(newButton);
  }
  projectNav.appendChild(projectButtonList);
}
