import { Component, OnInit } from '@angular/core';
import {GmapService} from '../common/gmap.service';
import {ApiService} from "../common/api.service";
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {GeoJsonLayer} from '@deck.gl/layers';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [GmapService, ApiService]
})
export class MapComponent implements OnInit {

  map = null;

  constructor(private gmapService: GmapService, private apiService: ApiService) {
  }

  loadGoogleMapGrids(data) {
    GmapService.map.data.addGeoJson(data);

    GmapService.map.data.setStyle({
      fillColor: '#3498db',
      fillOpacity: 0.5,
      strokeColor: '#2980b9',
      strokeWeight: 1,
    });
  }

  loadDeckGLGrids(data) {
    const deckOverlay = new GoogleMapsOverlay({
      layers: [
        new GeoJsonLayer({
          id: 'geojson-layer',
          data,
          pickable: false,
          stroked: true,
          filled: true,
          extruded: false,
          lineWidthUnits: 'pixels',
          lineWidthScale: 1,
          lineWidthMinPixels: 1,
          getFillColor: [160, 160, 180, 200],
          getLineColor: [0, 0, 255, 200],
          getLineWidth: 1,
        })
      ]
    });

    deckOverlay.setMap(GmapService.map);
  }

  loadGeoms() {
    const that = this;

    GmapService.map.setCenter({lng: 139.5392763, lat: 35.8345773});
    GmapService.map.setZoom(16);

    this.apiService.getGrids()
      .subscribe(data => {
        // that.loadGoogleMapGrids(data);
        that.loadDeckGLGrids(data);
      });
  }

  ngOnInit() {
    this.map = this.gmapService.createMap('mapcanvas');

    this.gmapService.addListenerOnce(this.map, 'tilesloaded', this.loadGeoms.bind(this));
  }
}
