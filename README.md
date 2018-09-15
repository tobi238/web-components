# web-components
Playground for Web Components

__🚀 All playgrounds are tagged. Switch between them to see more awesome stuff!__

# About
The project is written in TypeScript and uses the `tsc` compiler to generate ES5 JavaScript. It includes [polyfill.io](https://polyfill.io) polyfill service and polyfills for the web components standard ([webcomponents-bundle.js and custom-elements-es5-adapter.js](https://github.com/WebComponents/webcomponentsjs)), so the page works on all major browsers.

This project contains a single web component [src/MapElement.ts](src/MapElement.ts) written in Typescript. It is added to the DOM via JavaScript in [src/main.ts](src/main.ts) and directly in the HTML Document [index.html](index.html).

The MapElement uses some of the Custom Elements Lifecycle Methods and shows how to read custom attributes.

## How to use
1. Clone this repo and open it in VSCode.
2. Install Dependencies: `npm i`.
3. Run the VSCode Task `Dev Server` and a live server should automatically open in your browser.
