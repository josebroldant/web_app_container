import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private router: Router){}/*ESTE CONSTRUCTOR PERMITE HABILITAR NAVIGATE BY URL*/ 
    
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
      //console.log(this.usuario);
      //console.log(this.contra);
    }

  ngOnInit() {
  }

}
