import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dato } from '../models/model';
import { DatoDesbloqueo } from '../models/unlock_model';
/*
import express, { Request, Response } from "express";
import * as mongoose from "mongoose";


//MONGODB ATLAS CONNECTION
const app = express();
app.use(express.json());

const uri: string = "mongodb+srv://A7XENON:hQ2avCURNK1nMjcJ@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

//CREATE MONGODB DATA MODEL

export interface NewData extends mongoose.Document {
  voltage: string;
  current: string;
  power: string;
  state: string;
  level: string;
}

export const DataSchema = new mongoose.Schema({
  voltage: { type: String, required: true },
  current: { type: String, required: true },
  power: { type: String, required: true },
  state: { type: String, required: true },
  level: { type: String, required: true }
});

const Data = mongoose.model<NewData>("Data", DataSchema);
export default Data;

*/

//HTTP HEADERS SETUP

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MongoService {

  constructor(private http: HttpClient) {}
  
  private url = 'http://localhost:8081/getData';//Server url api get
  private unlockURL = 'http://localhost:8081/unlock';//Server url post

  getMongo(): Observable<Dato> {
    return this.http.get<Dato>(this.url);//GET data from nodejs server
  }

  unlock(data: DatoDesbloqueo): Observable<any>{//<> is the response of the post action, not the data that we are going to send
    console.log(data);
    return this.http.post<any>(this.unlockURL, data);//POST unlock data to the server
  }

}



