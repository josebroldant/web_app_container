import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ConnectService{
    constructor(private http){}

    saveUser(user){
        return this.http.post('http://localhost:5000/api/SaveUser', user)
        .map((response: Response) => response.json())
    }

    GetUser(){
        return this.http.get('http://localhost:5000/api/getUser')
        .map((response: Response) => response.json())
    }

    deleteUser(id){
        return this.http.post('http://localhost:5000/api/deleteUser', {'id':id})
        .map((response: Response) => response.json())
    }
    
}