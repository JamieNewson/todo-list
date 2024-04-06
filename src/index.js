import _ from "lodash";
import "./styles.css";

if (process.env.NODE_ENV !== "production")
  console.log("Looks like we are in development mode!");

function component() {
  const ele = document.createElement("div");

  ele.innerText = "Hello World!";

  return ele;
}

document.body.appendChild(component());
