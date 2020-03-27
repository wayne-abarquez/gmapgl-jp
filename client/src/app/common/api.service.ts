import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grid } from '../grid';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static BASE_URL = 'http://192.168.178.8:88';

  constructor(private http: HttpClient) { }

  getGrids() {
    return this.http.get(`${ApiService.BASE_URL}/v1/grids`);
  }
}
