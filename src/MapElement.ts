
import { Map, Icon, TileLayer, latLng, LatLngExpression } from 'leaflet';

export default class MapElement extends HTMLElement {
  private styles: HTMLStyleElement;

  map: Map;
  mapContainer: HTMLElement;
  private apiKey: string;
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
    this.setupIcons();
    this.apiKey = 'pk.eyJ1IjoidG9iaTIzOCIsImEiOiJQOTUxczRNIn0.AD6w_VU06HpfTc4rJDTwnQ';

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
    this.shadowRoot.appendChild(this.styles)

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
  };

  // ELEMENT ATTRIBUTES CHANGED CALLBACK
  static get observedAttributes() { return ['center', 'zoom']; }

  attributeChangedCallback(name, oldValue, newValue) {
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
   * overwrite default location of leaflet icons and stylesheet
   */
  setupIcons() {
    Icon.Default.imagePath = window.location.origin;
    Icon.Default.mergeOptions({
      iconRetinaUrl: `lib/leaflet/marker-icon-2x.png`,
      iconUrl: `lib/leaflet/marker-icon.png`,
      shadowUrl: `lib/leaflet/marker-shadow.png`,
    });

    const leafletCSS = document.createElement('link');
    leafletCSS.href = `lib/leaflet/leaflet.css`;
    leafletCSS.type = 'text/css';
    leafletCSS.rel = 'stylesheet';
    leafletCSS.media = 'screen,print';
    this.shadowRoot.appendChild(leafletCSS);
  }

  /**
   * create a new leaflet map
   * @param {HTMLElement|string} target map container element
   */
  createMap(target) {
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
    return new TileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      accessToken: this.apiKey,
      attribution: `Map data &copy;<a href="https://www.openstreetmap.org/">OpenStreetMap</a>
      contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
      Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
      id: 'mapbox.streets',
      maxZoom: 18,
    });
  }
}