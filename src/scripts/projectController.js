import domController from "./domController.js";
import buildElement from "./createElement.js";
import jsonHandler from "./jsonHandler.js";

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

let activeProject;

function createProject(projectInput) {
  let newProject = new Project(
    projectInput.nameInput.value,
    projectInput.descriptionInput.value,
    projectInput.colorInput.value
  );

  jsonHandler.pushNewProject(newProject);

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

function getProjects() {
  activeProject = jsonHandler.fetchProjects()[0];
  return jsonHandler.fetchProjects();
}

function getProject(projectID) {
  return jsonHandler.fetchProjects().find(({ id }) => id === projectID);
}

function getActiveProject() {
  return jsonHandler.fetchActiveProject();
}

function setActiveProject(projectID) {
  jsonHandler.setActiveProject(getProject(projectID));
}

export default {
  Project,
  getActiveProject,
  setActiveProject,
  getProjects,
  createProject,
  createProjectNavButton,
};
