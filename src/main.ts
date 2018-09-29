import MapElement from "./MapElement";

// register new element
window.customElements.define("custom-map", MapElement);

// create new element in js
const newMap = document.createElement("custom-map");
document.body.appendChild(newMap);
newMap.setAttribute("bg-white", "");
newMap.setAttribute("center", "[49.010617, 8.3637583]");
newMap.setAttribute("zoom", "13");
