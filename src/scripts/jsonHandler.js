import projectController from "./projectController";
import toDoController from "./toDoController";

function fetchProjects() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (!projects) return [];
  const initialisedProjects = projects.map((project) =>
    Object.assign(new projectController.Project(), project)
  );
  return initialisedProjects;
}

function pushNewProject(project) {
  const currentProjects = fetchProjects();
  currentProjects.push(project);
  saveToLocal("projects", currentProjects);
}

function fetchActiveProject() {
  let project = JSON.parse(localStorage.getItem("activeProject"));
  project = Object.assign(new projectController.Project(), project);
  return project;
}

function setActiveProject(project) {
  saveToLocal("activeProject", project);
}

function fetchToDos() {
  const toDos = JSON.parse(localStorage.getItem("toDos"));
  if (!toDos) return [];
  const initialisedToDos = toDos.map((toDo) =>
    Object.assign(new toDoController.ToDo(), toDo)
  );
  return initialisedToDos;
}

function pushNewToDo(toDo) {
  const currentToDos = fetchToDos();
  currentToDos.push(toDo);
  saveToLocal("toDos", currentToDos);
}

function updateToDo(toDo) {
  const toDos = fetchToDos();
  const targetIndex = fetchToDos().findIndex(({ id }) => id === toDo.id);
  toDos[targetIndex] = toDo;
  saveToLocal("toDos", toDos);
}

function saveToLocal(key, list) {
  const stringified = JSON.stringify(list);
  localStorage.setItem(key, stringified);
}

export default {
  fetchProjects,
  pushNewProject,
  fetchActiveProject,
  setActiveProject,
  fetchToDos,
  pushNewToDo,
  updateToDo,
};
