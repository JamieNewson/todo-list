import _ from "lodash";
import "../styles.css";
import domController from "./domController.js";
import formHandler from "./formHandler.js";

if (process.env.NODE_ENV !== "production")
  console.log("Looks like we are in development mode!");

domController.displayProjectList();
