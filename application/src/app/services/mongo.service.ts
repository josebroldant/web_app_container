import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RequestService } from './request.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MongoService {

  sensorData: any;

  constructor(private req: RequestService) {}
  
  public getMongo(modelo: any) {
    this.sensorData=this.req.get(`/inicio`, { data: modelo});
    return this.sensorData;
  }

}


