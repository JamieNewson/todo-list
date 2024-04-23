let toDos = "[]";
let projects = "[]";

function pushNewToDo(toDo) {
  const parsed = JSON.parse(toDos);
  parsed.push(toDo);
  toDos = JSON.stringify(parsed);
  localStorage.setItem("toDos", toDos);
  console.log(JSON.parse(localStorage.getItem("toDos")));
}

function updateToDo(element) {
  const parsed = JSON.parse(toDos);
}

function getToDos() {
  return JSON.parse(localStorage.getItem("toDos"));
}

function pushNewProject(project) {
  const parsed = JSON.parse(projects);
  parsed.push(project);
  projects = JSON.stringify(parsed);
  localStorage.setItem("projects", projects);
}

function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

export default { pushNewToDo, getToDos, pushNewProject, getProjects };
