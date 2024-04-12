import domController from "./domController.js";

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
  const currentProject = projects.find(({ id }) => id === projectID);
  const name = currentProject.getName();
  const description = currentProject.getDescription();
  return { name, description };
}

function getProjectList() {
  let projectInfo = [];
  for (const project of projects) {
    projectInfo.push({ name: project.getName(), id: project.getID() });
  }
  return projectInfo;
}

function getActiveProjectID() {
  return activeProjectID;
}

function setActiveProjectID(projectID) {
  activeProjectID = projectID;
  console.log(activeProjectID);
}

function createProject(name, description) {
  let newProject = new Project(name, description);

  projects.push(newProject);

  domController.createProjectButton(newProject);
}

export default {
  getProject,
  getActiveProjectID,
  setActiveProjectID,
  getProjectList,
  createProject,
};
