function createElementWithText(element, text) {
  const newElement = document.createElement(element);
  newElement.innerText = text;
  return newElement;
}

function createElementWithClass(element, text, elementClass) {
  const newElement = createElementWithText(element, text);
  newElement.classList = elementClass;
  return newElement;
}

function createElementWithID(element, text, elementID) {
  const newElement = createElementWithText(element, text);
  newElement.id = elementID;
  return newElement;
}

function createElementWithClassAndID(element, text, elementClass, elementID) {
  const newElement = createElementWithClass(element, text, elementClass);
  newElement.id = elementID;
  return newElement;
}

export default {
  createElementWithText,
  createElementWithClass,
  createElementWithID,
  createElementWithClassAndID,
};
