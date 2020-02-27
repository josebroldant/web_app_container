import { Request, Response } from "express";
import Data from "./../app/services/mongo.service";


//DATA OPERATOR IS IMPORTED FROM?
export let allData = (req: Request, res: Response) => {
    let data = Data.find((err: any, data: any) => {
      if (err) {
        res.send("Error!");
      } else {
        res.send(data);
      }
    });
  };

