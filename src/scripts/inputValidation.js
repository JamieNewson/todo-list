function validateProject(newProject) {
  let isValid = true;

  if (!validateName(newProject.nameInput)) isValid = false;
  if (!validateDescription(newProject.descriptionInput)) isValid = false;

  return isValid;
}

function validateToDo(newToDo) {
  let isValid = true;

  if (!validateName(newToDo.nameInput)) isValid = false;
  if (!validateDescription(newToDo.descriptionInput)) isValid = false;
  if (!validateDueDate(newToDo.dueDateInput)) isValid = false;

  return isValid;
}

function validateName(input) {
  input.className =
    input.value.length > 3 && input.value.length < 20 ? "" : "invalid";
  return input.value.length > 3 && input.value.length < 20;
}

function validateDescription(input) {
  input.className = input.value.length < 40 ? "" : "invalid";
  return input.value.length < 40;
}

function validateDueDate(dueDate) {
  const currentDate = new Date().toLocaleDateString("fr-ca");
  input.className = input.value >= currentDate ? "" : "invalid";
  return dueDate.value >= currentDate;
}

export { validateProject, validateToDo };
