import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  makeRequest(url: string): Observable<response>{
    const headers = new HttpHeaders().set('AA', 'BB');//just parameters
    const params = new HttpParams().set('1',' 2').set('a','b');//setea parametros en la url http://xxxxxxxx.com/hello/1%2%a%b
    //return this.http.get(url,{params: params, headers: headers});common return of parameters
    return this.http.get<response>(url,{params: params, headers: headers});
  }

  obtenerUsuario(id: string): Observable<datos>{
    //return this.http.get<datos>(`http://demo5812578.mockable.io/datos/${id}`);//``concatenacion
    //GET data from mongodb
    return this.http.get<datos>(`mongodb+srv://ssmcluster-aobqi.mongodb.net/test`);
    }
  }

interface response{
  msg: string;
}

interface data{
  msg: string;
}

export class datos{
  voltaje: number;
  corriente: number;
  potencia: number;
  llenado: number;
  estado: string;
}
