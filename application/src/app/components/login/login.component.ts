import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';//SE USA PARA CHILD ROUTES

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private metodo: LoginService) { }

  usuario: string;
  contra: string;
  loggedin = false;

  ingreso(){
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

  navigateTo(to: string){
    this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
  }

  ngOnInit() {
  }

}
