import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClienteService, datos } from 'src/app/services/cliente.service';
import { Servicio1Service } from 'src/app/services/servicio1.service';
import { UserNameService } from 'src/app/services/userNameService.service';
import { mongoose } from 'mongoose';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';
import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-component1',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario='';
  contra='';
  
  ngOnInit() {
  }

  @Input() datos: string;
  _subscription_user_name: any;
  userName: any;

  constructor(private router: Router, private metodo: Servicio1Service, private cliente: ClienteService,
    private rutaActivada: ActivatedRoute, private userNameService : UserNameService, private connectService: ConnectService){
      /*this._subscription_user_name = this.userNameService.execChange.subscribe((value) => {
        this.userName= value; // this.username will hold your value and modify it every time it changes 
    });
    */
  }

  voltaje: number;
  corriente: number;
  potencia: number;
  llenado: number;
  estado: string;
  loggedin = false;
    
  userId: string;//identificador de los datos
  user: datos = new datos();//datos exportados del servicio

  request(){
    /*
    //SOLO PARA SETEAR LOS PARAMS DE LA URL
      
    //this.cliente.makeRequest('http://demo5812578.mockable.io/hello').subscribe();  COMMON FUNCITON
    this.cliente.makeRequest('mongodb+srv://A7XENON:<password>@ssmcluster-aobqi.mongodb.net/test?retryWrites=true&w=majority').subscribe(res => {
      console.log(res.msg);//display the message received from service interface
    }, err =>{
      console.log('ERROR');//config of mockable
      console.log(err);
    });
    */
 
   
    this.cliente.obtenerUsuario(this.userId).subscribe(res => {//EL SERVICIO OBTENER USUARIO SE GUIA POR EL ID DE LA URL
     this.user = res;
   }, err =>{//EN CASO DE ERROR
     this.user = new datos();
     console.log('data not found');
   });
  
  

  }

  conexion(){
    this.connectService.GetUser();
  }
    
  navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
  }

  salida(){
    this.navigateTo("/login");
  }

}

