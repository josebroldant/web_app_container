import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  estado = false;

  login(usuario: string, contra: string): Observable<boolean>{
    this.estado = false;
    if(usuario=='joseroldan' && contra=='1234567890'){
      this.estado = true;
    }
    else{
      
    }
    return of(this.estado);
  }

  navigateTo(to: string){
    this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
  }

  constructor(private router: Router){}
}
