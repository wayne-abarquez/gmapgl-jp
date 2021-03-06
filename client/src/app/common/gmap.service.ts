import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GmapService {

  static map = null;

  static DEFAULT_ZOOM_LEVEL = 5;

  static DEFAULT_CENTER = {lat: 36.5979417, lng: 140.105978};

  constructor() {

  }

  isAPIAvailable() {
    return typeof google === 'object';
  }

  createMap(id, opts = {}) {
    if (!this.isAPIAvailable()) { return; }

    const refMap = document.getElementById(id);

    const source = {
      zoom: GmapService.DEFAULT_ZOOM_LEVEL,
      center: GmapService.DEFAULT_CENTER,
      fullscreenControl: false,
      panControl: false,
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        style: google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: ['roadmap', 'terrain', 'satellite', 'hybrid']
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      clickableIcons: false,
      noClear: true,
      // gestureHandling: 'greedy',
      controlSize: 28
    };

    GmapService.map = new google.maps.Map(refMap, Object.assign({}, source, opts));

    return GmapService.map;
  }

  addListenerOnce(instance, eventName, handler) {
    if (!this.isAPIAvailable()) { return; }

    return google.maps.event.addListenerOnce(instance, eventName, handler);
  }

  addListener(instance, eventName, handler) {
    if (!this.isAPIAvailable()) { return; }

    return google.maps.event.addListener(instance, eventName, handler);
  }

  createPolygon(path, opts = {}) {
    if (!this.isAPIAvailable()) return;

    let polygonOptions = {
      fillColor: '#3498db',
      fillOpacity: 0.5,
      strokeColor: '#2980b9',
      strokeWeight: 1,
      clickable: false,
      editable: false,
      zIndex: 1
    };

    if (Array.isArray(path[0])) {
      polygonOptions.paths = path;
    } else {
      polygonOptions.path = path;
    }

    polygonOptions.editable = false;
    polygonOptions.clickable = true;
    polygonOptions.map = GmapService.map;

    return new google.maps.Polygon(Object.assign({}, polygonOptions, opts));
  }

  createBounds(path) {
    let _bounds = new google.maps.LatLngBounds();

    path.forEach(latLng => {
      _bounds.extend(latLng);
    });

    return _bounds;
  }

  setViewportByBounds(bounds) {
    GmapService.map.fitBounds(bounds);
  }

}
