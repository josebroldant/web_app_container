import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MongoService } from 'src/app/services/mongo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dato } from 'src/app/models/modelo';
import { DatoDesbloqueo } from 'src/app/models/unlock_model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public datos: Dato;//FOR OBTAIN DATA
  public unlock_datos : DatoDesbloqueo;//FOR UNLOCK

  constructor(private router: Router, private mongoService: MongoService) {
    this.unlock_datos = new DatoDesbloqueo();
    this.unlock_datos.estado = "N";
  }

  //OBTAIN DATA FROM SERVER
  obtainData(){
    this.mongoService.getMongo().subscribe(data => {
      console.log(data);
      this.datos = data;
    });
  }

  //SEND UNLOCK RESPONSE TO SERVER
  unlock(){
    this.mongoService.unlock(this.unlock_datos).subscribe(data_unlock => {
      console.log(data_unlock);
    });
  }
  
  //ROUTING
  navigateTo(to: string){
      this.router.navigate([to]);/*this.router.navigate([to, this.usuario])    --->   /terms/usuario   */ 
  }

  //GO TO LOGIN
  salida(){
    this.navigateTo("/login");
  }

  //Show on the front
  ngOnInit() {
    window.setInterval(()=>{
      this.obtainData();
    },1000);
  }

}

