import domController from "./domController.js";
import toDo from "./todo.js";

class Project {
  constructor(name, description) {
    this.id = `proj-${Math.random().toString(16).slice(4)}`;
    this.name = name;
    this.description = description;
    this.toDos = [];
  }

  getID() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  setDescription(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }

  setToDo(toDo) {
    this.toDos.push(toDo);
  }
  getToDos() {
    return getToDos(this.id);
  }
}

let projects = [];

const proj1 = new Project("My Project", "My first ever project");
const proj2 = new Project("My 2nd Project", "My second project");
const proj3 = new Project("Project No 3", "My third project");

projects.push(proj1);
projects.push(proj2);
projects.push(proj3);

let activeProjectID = projects[0].getID();

function getProject(projectID) {
  return projects.find(({ id }) => id === projectID);
}

function getProjectIDs() {
  let projectInfo = [];
  for (const project of projects) {
    projectInfo.push({ name: project.getName(), id: project.getID() });
  }
  return projectInfo;
}

function getActiveProjectID() {
  return activeProjectID;
}

function displayProject(projectID) {
  activeProjectID = projectID;
  const element = document.createElement("div");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  const projectToDos = document.createElement("ul");

  projectTitle.innerText = getProject(projectID).getName();
  projectDescription.innerText = getProject(projectID).getDescription();
  element.appendChild(projectTitle);
  element.appendChild(projectDescription);

  projectToDos.append(...toDo.getToDos(projectID));
  element.appendChild(projectToDos);

  return element;
}

const createProjectForm = document.querySelector("#createProjectForm");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#project-name");
  let description = document.querySelector("#project-description");

  let newProject = new Project(name.value, description.value);

  createProjectForm.reset();
  projects.push(newProject);

  domController.createProjectButton(newProject);
});

export default {
  getProjectIDs,
  displayProject,
  getActiveProjectID,
};
