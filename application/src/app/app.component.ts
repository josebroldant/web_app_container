import { Component, Directive, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from './services/cliente.service';
import { Servicio1Service } from './services/servicio1.service';

//ALL THIS CODE IS ABOUT CLASSES AND FUCNTIONS AND LOGICAL ACTIONS OF THE PROGRAM

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ClienteService]
  
})
export class AppComponent {

  fontSize: string;
  color: string;
    
    usuario = '';
    contra = '';
    loggedin = false;
    
    constructor(private router: Router , private cliente: ClienteService, private metodo: Servicio1Service){
      /*
      mensaje.getEstado().subscribe(estado => console.log(estado));//DESPUES DE HACER LA FUNCION, UTILIZA SUBSCRIBE,
      //DESDE EL METODO OF DECLARADO EN EL SERVICIO PARA POSTEAR EL ESTADO EN CONSOLA EN ESTE CASO
      mensaje.log('INFO','creating app component');//LA VARIABLE MENSAJE RECIBE LOS PARAMETROS DE LA FUNCION LOG DECLARADA EN EL SERVICIO
      mensaje.getEstado().subscribe(estado => console.log(estado));
      */
    }
    
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
    }    

}

