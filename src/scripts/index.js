import "../styles.css";
import domController from "./domController.js";
// eslint-disable-next-line no-unused-vars
import formHandler from "./formHandler.js";

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production")
  console.log("Looks like we are in development mode!");

domController.displayProjectList();
