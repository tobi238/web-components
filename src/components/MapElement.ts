import { Map, TileLayer, latLng, LatLngExpression } from 'leaflet';

export default class MapElement extends HTMLElement {
  private styles: HTMLStyleElement;

  shadowRoot!: ShadowRoot;

  map!: Map;
  mapContainer: HTMLElement;
  private center: LatLngExpression = latLng([49.010617, 8.3637583]);
  private zoom: number = 10;
  baseLayer: TileLayer;

  constructor() {
    super();

    // SHADOW ROOT
    this.attachShadow({
      mode: 'open'
    });

    // SETUP LEAFLET
    this.setupLeafletStylesheet();

    // STYLES
    this.styles = document.createElement('style');
    this.styles.innerHTML = `
      :host {
        position: relative;
        visibility: hidden;
      }

      @keyframes fadeIn {
        from {
          visibility: hidden;
          opacity: 0;
        }
        to {
          visibility: visible;
          opacity: 1;
        }
      }

      :host([bg-white]) .leaflet-container {
        background: white;
      }

      .leaflet-container {
        width: 50vw;
        height: 50vh;
      }
      .leaflet-container.show { 
        animation: fadeIn .6s ease 0s forwards;
      }
    `;
    this.shadowRoot.appendChild(this.styles);

    // HTML
    this.mapContainer = document.createElement('div');
    this.shadowRoot.appendChild(this.mapContainer);

    this.createMap(this.mapContainer);

    this.baseLayer = this.createBaseLayer();
    this.map.addLayer(this.baseLayer);
  }

  // ELEMENT CONNECTED TO DOM CALLBACK
  connectedCallback() {
    this.map.invalidateSize();
    this.mapContainer.classList.add('show');
  }

  // ELEMENT ATTRIBUTES CHANGED CALLBACK
  static get observedAttributes() {
    return ['center', 'zoom'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(this, name, oldValue, newValue);
    switch (name) {
      case 'center':
        this.center = latLng(JSON.parse(newValue));
        this.map.flyTo(this.center, this.zoom, {
          duration: 0.3
        });
        break;
      case 'zoom':
        this.zoom = Number(newValue);
        this.map.flyTo(this.center, this.zoom, {
          duration: 0.3
        });
        break;
    }
  }

  // CUSTOM METHODS

  /**
   * Setup leaflet stylesheet by searching parent scope link url and create new link inside component
   */
  setupLeafletStylesheet() {
    const parentLink = document.getElementById('leafletStyle') as HTMLLinkElement;
    const leafletCSS = document.createElement('link');
    leafletCSS.href = parentLink && parentLink.href;
    leafletCSS.type = 'text/css';
    leafletCSS.rel = 'stylesheet';
    leafletCSS.media = 'screen,print';
    this.shadowRoot.appendChild(leafletCSS);
  }

  /**
   * create a new leaflet map
   * @param {HTMLElement|string} target map container element
   */
  createMap(target: HTMLElement | string) {
    this.map = new Map(target, {
      center: this.center,
      zoom: this.zoom,
      maxZoom: 18
    });
  }

  /**
   * create a base tile layer
   */
  createBaseLayer() {
    return new TileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
      {
        // tslint:disable-next-line: max-line-length
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        id: 'mapbox.streets',
        maxZoom: 18
      });
  }
}
