import { Component, OnInit } from '@angular/core';
import {GmapService} from '../common/gmap.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [GmapService]
})
export class MapComponent implements OnInit {

  map = null;

  constructor(private gmapService: GmapService) {
  }

  loadGeoms() {
    console.log('loadGeoms');
  }

  ngOnInit() {
    this.map = this.gmapService.createMap('mapcanvas');

    this.gmapService.addListenerOnce(this.map, 'tilesloaded', this.loadGeoms);
  }
}
