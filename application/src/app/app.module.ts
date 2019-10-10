import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { Servicio1Service } from './services/servicio1.service';
import { ActivatedRoute } from '@angular/router';
import { UserNameService } from 'src/app/services/userNameService.service';


//ALL THIS CODE IS JUST FOR INCLUDING COMPONENTS OF ANGULAR AND IMPORT AND EXPORT ELEMENTS BETWEEN COMPONENTS



@NgModule({
  
  declarations: [
    AppComponent,
    InicioComponent,
    NotfoundComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
    
  ],
  providers: [Servicio1Service, ClienteService, UserNameService],//ALWAYS CALL SERVICES HERE IN MODULE.TS
  bootstrap: [AppComponent]
})
export class AppModule { }
