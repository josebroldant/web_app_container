import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch';
import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import * as DataController from "src/app/DataController";

const app = express();
app.use(express.json());

const uri: string = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

app.get("/data", DataController.allData);//API direction

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


/*
// 1. Connect to MongoDB
// It’s simple to point Stitch to a MongoDB collection
const stitchClient = Stitch.initializeDefaultAppClient('myApp');

// Connect to a MongoDB Atlas database
const db = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('test');//name of database

stitchClient.auth.loginWithCredential(new AnonymousCredential())
  .then(() =>
  db.collection("modelos").find({}).asArray()
  ).then((docs) =>
  docs.forEach((doc, index) =>
    console.log(`${index}: ${JSON.stringify(doc)}`)
  )
);

const uri = "mongodb+srv://A7XENON:Exeron@97@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority";//mongodb web url
db.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfuly conected to mongodb atlas");
        
    })
    .catch((err) => console.error(err));
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(private req: RequestService, private http: HttpClient) {}
  
  sensorData: any;

  public getMongo() {
    //this.sensorData = req.body;
    this.sensorData=this.http.get('http://localhost:8081/');
    return this.sensorData;
  }

}


