import domController from "./domController.js";

class Project {
  constructor(name, description) {
    this.id = `prj-${Math.random().toString(16).slice(4)}`;
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
    return this.toDos;
  }
}

let projects = [];

const proj1 = new Project("My Project", "My first ever project");
const proj2 = new Project("My 2nd Project", "My second project");
const proj3 = new Project("Project No 3", "My third project");

proj1.setToDo({
  name: "ToDo 1",
  dueDate: "5/5/24",
  priority: 1,
});
proj1.setToDo({
  name: "ToDo 2",
  dueDate: "6/9/24",
  priority: 2,
});
proj2.setToDo({
  name: "ToDo 3",
  dueDate: "25/12/24",
  priority: 3,
});
proj3.setToDo({
  name: "ToDo 4",
  dueDate: "31/12/24",
  priority: 3,
});

projects.push(proj1);
projects.push(proj2);
projects.push(proj3);

const createProjectForm = document.querySelector("#createProject");
createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#project-name");
  let description = document.querySelector("#project-description");

  let newProject = new Project(name.value, description.value);

  createProjectForm.reset();
  projects.push(newProject);

  domController.createButton(newProject);
});

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

function displayProject(projectID) {
  const element = document.createElement("div");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  const projectToDos = document.createElement("ul");

  projectTitle.innerText = getProject(projectID).getName();
  projectDescription.innerText = getProject(projectID).getDescription();
  projectToDos.append(...formatToDo(projectID));

  element.appendChild(projectTitle);
  element.appendChild(projectDescription);
  element.appendChild(projectToDos);

  return element;
}

function formatToDo(projectID) {
  let todoList = [];
  for (const toDo of getProject(projectID).getToDos()) {
    const todoElement = document.createElement("li");
    todoElement.innerText = `Name: ${toDo.name}, Priority: ${toDo.priority}`;
    todoList.push(todoElement);
  }
  return todoList;
}

export default {
  getProjectIDs,
  displayProject,
};
