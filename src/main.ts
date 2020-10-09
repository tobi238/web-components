import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'

import MapElement from './components/MapElement';

import './main.scss';

// register new element
window.customElements.define('custom-map', MapElement);

// create new element in js
const newMap = document.createElement('custom-map');
document.body.appendChild(newMap);
newMap.setAttribute('bg-white', '');
newMap.setAttribute('center', '[49.010617, 8.3637583]');
newMap.setAttribute('zoom', '13');
