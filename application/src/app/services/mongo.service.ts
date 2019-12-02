import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RequestService } from './request.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MongoService {

  sensorData: any;

  constructor(private req: RequestService, private http: HttpClient) {}
  
  public getMongo() {
    this.sensorData=this.http.get('http://localhost:5000/');
    return this.sensorData;
  }

}


