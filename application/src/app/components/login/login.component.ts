import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService, datos } from 'src/app/services/cliente.service';
import { Servicio1Service } from 'src/app/services/servicio1.service';
import { ActivatedRoute } from '@angular/router';//SE USA PARA CHILD ROUTES
import { UserNameService } from 'src/app/services/userNameService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/*
class data{
  usuario: string;
  contra: string;
  loggedin = false;
}
*/
export class LoginComponent implements OnInit {

  @Input() datos: string;
  _subscription_user_name: any;
  userName: any;

  /*
  displayData: data = new data();
  nuevaData: data = new data();
  */

  
  constructor(private router: Router, private metodo: Servicio1Service, private cliente: ClienteService,
    private rutaActivada: ActivatedRoute, private userNameService : UserNameService){
      this._subscription_user_name = this.userNameService.execChange.subscribe((value) => {
        this.userName= value; // this.username will hold your value and modify it every time it changes 
    });
    }
  
  
  usuario: string;
  contra: string;
  loggedin = false;
  
  userId: string;//identificador de los datos
  user: datos = new datos();//datos exportados del servicio

  
  ingreso(){
    /*
    this.displayData.usuario = this.nuevaData.usuario;
    this.displayData.contra = this.nuevaData.contra;
    this.displayData.loggedin = this.nuevaData.loggedin;
    */
    this.metodo.login(this.usuario, this.contra).subscribe(loggedin => {if(loggedin===true){
      alert('Bienvenido '+this.usuario);
      this.navigateTo("/inicio");
    }
    else{
      alert('Usuario o contraseña incorrectos');
    }
    this.loggedin=loggedin;
    }) 
  }

    registro(){
      this.navigateTo("/formulario");
    }

    request(){
      
    /*
     this.cliente.obtenerUsuario(this.userId).subscribe(res => {//EL SERVICIO OBTENER USUARIO SE GUIA POR EL ID DE LA URL
       this.user = res;
     }, err =>{//EN CASO DE ERROR
       this.user = new datos();
       console.log('user not found');
     });
     */
    }
    
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
    }

    onSubmit(something, usuarioInput){
      console.log(usuarioInput);
    }

  ngOnInit() {
    
  }
}

