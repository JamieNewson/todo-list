import domController from "./domController.js";
import buildElement from "./createElement.js";

class Project {
  constructor(name, description, color) {
    this.id = `proj-${Math.random().toString(16).slice(4)}`;
    this.name = name;
    this.description = description;
    this.labelColor = color;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
  }

  getColor() {
    return this.labelColor;
  }
}

let projects = [];

let newProject = new Project("proj", "desc", "#fff");
projects.push(newProject);

let activeProject = projects[0];

function createProject(projectInput) {
  let newProject = new Project(
    projectInput.nameInput.value,
    projectInput.descriptionInput.value,
    projectInput.colorInput.value
  );

  projects.push(newProject);

  return newProject;
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

  element.addEventListener("click", (event) => {
    domController.handleNav(event);
  });

  return element;
}

function getProject(projectID) {
  return projects.find(({ id }) => id === projectID);
}

function getProjectList() {
  return projects;
}

function getActiveProject() {
  return activeProject;
}

function setActiveProject(projectID) {
  activeProject = getProject(projectID);
}

export default {
  getActiveProject,
  setActiveProject,
  getProjectList,
  createProject,
  createProjectNavButton,
};
