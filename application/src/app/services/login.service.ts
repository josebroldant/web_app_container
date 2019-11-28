import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RequestService } from '../services/request.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class LoginService {

  seller: any;
  idloged: number;

  constructor(private req: RequestService) {
    this.idloged=0;
   }

  public getSeller(username: string, password: string) {
    this.seller=this.req.get(`/sesion-api/getSesion`, { queryParams: { username, password } });
    return this.seller;
  }

  setIdloged(id: number){
    this.idloged= id;
  }
  getsellerloged(){
    return this.seller;
  }

}


