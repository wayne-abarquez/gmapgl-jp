import { Component, OnInit } from '@angular/core';
import {GmapService} from '../common/gmap.service';
import {ApiService} from "../common/api.service";

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

  loadGeoms() {
    console.log('loadGeoms',this.apiService);

    this.apiService.getGrids()
      .subscribe(data => {
          console.log('grids: ',data);
      });
  }

  ngOnInit() {
    this.map = this.gmapService.createMap('mapcanvas');

    this.gmapService.addListenerOnce(this.map, 'tilesloaded', this.loadGeoms.bind(this));
  }
}
