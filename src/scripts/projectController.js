import domController from "./domController.js";

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

  getColor() {
    return this.labelColor;
  }
}

let projects = [];

const proj1 = new Project("My Project", "My first ever project", "#2a2e45");
const proj2 = new Project("My 2nd Project", "My second project", "#FE938C");
const proj3 = new Project("Project No 3", "My third project", "#62a87c");

projects.push(proj1);
projects.push(proj2);
projects.push(proj3);

let activeProject = projects[0];

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

function createProject(projectInput) {
  let newProject = new Project(
    projectInput.nameInput.value,
    projectInput.descriptionInput.value,
    projectInput.colorInput.value
  );

  projects.push(newProject);

  domController.createProjectButton(newProject);
}

export default {
  getProject,
  getActiveProject,
  setActiveProject,
  getProjectList,
  createProject,
};
