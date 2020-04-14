import { Component, Directive, Pipe, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from './services/cliente.service';
import { Servicio1Service } from './services/servicio1.service';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest} from '@angular/common/http';
import { MongoService } from './services/mongo.service';


//ALL THIS CODE IS ABOUT CLASSES AND FUCNTIONS AND LOGICAL ACTIONS OF THE PROGRAM

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ClienteService, MongoService]
  
})
export class AppComponent {

  fontSize: string;
  color: string;
    
    usuario = '';
    contra = '';
    loggedin = false;
    
    constructor(private router: Router , private cliente: ClienteService, private metodo: Servicio1Service, private newService: MongoService){
      /*
      mensaje.getEstado().subscribe(estado => console.log(estado));//DESPUES DE HACER LA FUNCION, UTILIZA SUBSCRIBE,
      //DESDE EL METODO OF DECLARADO EN EL SERVICIO PARA POSTEAR EL ESTADO EN CONSOLA EN ESTE CASO
      mensaje.log('INFO','creating app component');//LA VARIABLE MENSAJE RECIBE LOS PARAMETROS DE LA FUNCION LOG DECLARADA EN EL SERVICIO
      mensaje.getEstado().subscribe(estado => console.log(estado));
      */
    }

    //LOCAL METHODS
    onSave = function(user, isValid: boolean){
      user.mode = this.ValButton;
      this.newService.saveUser(user).subscribe(data => {alert(data.data);
      this.ngOnInit();
    }
    , error => this.errorMessage = error)

    }

    edit = function(kk){
      this.id = kk._id;
      this.voltaje = kk.voltaje;
      this.corriente = kk.corriente;
      this.potencia = kk.potencia;
      this.llenado = kk.llenado;
      this.estado = kk.estado;
    }

    delete = function(id){
      this.newService.deleteUser(id).subscribe(data => {alert(data.data);
      this.ngOnInit();}, error => this.errorMessage = error)
    }

    
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
    }    

}

