# web-components
Playing with Web Components

# About
The project is written in TypeScript and uses the `tsc` compiler to generate ES5 JavaScript. It includes [polyfill.io](https://polyfill.io) polyfill service and polyfills for the web components standard ([webcomponents-bundle.js and custom-elements-es5-adapter.js](https://github.com/WebComponents/webcomponentsjs)), so the page works on all major browsers.

This project contains a single web component [src/CounterElement.ts](src/CounterElement.ts) written in Typescript. It is added to the DOM in [src/main.ts](src/main.ts).


## How to use
1. Install Typescript: `npm i -g typescript`
2. Clone this repo and open it in VSCode.
3. Run the VSCode Task `tsc - watch` and a live server to see this project in action.
