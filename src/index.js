import _ from "lodash";
import "./styles.css";
import domController from "./domController";

if (process.env.NODE_ENV !== "production")
  console.log("Looks like we are in development mode!");

domController();
