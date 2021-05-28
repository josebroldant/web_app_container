import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  estado: boolean = false;

  login(usuario: string, contra: string): Observable<boolean>{
    this.estado = false;
    if(usuario=='admin' && contra=='1234567890'){
      this.estado = true;
    }
    else{
      this.estado = false;
    }
    return of(this.estado);
  }

  navigateTo(to: string){
    this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
  }

  constructor(private router: Router){}
}
