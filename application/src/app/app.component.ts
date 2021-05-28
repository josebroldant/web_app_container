import { Component, Directive, Pipe, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest} from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { LoginService } from './services/login.service';
import { MongoService } from './services/mongo.service';
import { UserNameService } from './services/userNameService.service';


//ALL THIS CODE IS ABOUT CLASSES AND FUCNTIONS AND LOGICAL ACTIONS OF THE PROGRAM

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Router, ClienteService, MongoService, LoginService]
  
})
export class AppComponent {
    
    constructor(private router: Router , private clienteserv: ClienteService, private loginserv: LoginService, private mongoserv: MongoService){
      /*
      mensaje.getEstado().subscribe(estado => console.log(estado));//DESPUES DE HACER LA FUNCION, UTILIZA SUBSCRIBE,
      //DESDE EL METODO OF DECLARADO EN EL SERVICIO PARA POSTEAR EL ESTADO EN CONSOLA EN ESTE CASO
      mensaje.log('INFO','creating app component');//LA VARIABLE MENSAJE RECIBE LOS PARAMETROS DE LA FUNCION LOG DECLARADA EN EL SERVICIO
      mensaje.getEstado().subscribe(estado => console.log(estado));
      */

    }

    //LOCAL METHODS
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
    }    

}

