import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation, Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  usuario='';
  contra='';
  
  ngOnInit() {
  }

  constructor(private router: Router){}/*ESTE CONSTRUCTOR PERMITE HABILITAR NAVIGATE BY URL*/ 
    
    navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
    }

  salida(){
    this.navigateTo("/login");
  }

}
