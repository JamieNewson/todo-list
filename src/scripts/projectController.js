import domController from "./domController.js";
console.log("project controller called");

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

  domController.createProjectNavButton(newProject);
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
  getProject,
  getActiveProject,
  setActiveProject,
  getProjectList,
  createProject,
};
