import { NgModule, Component } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ActivatedRoute } from '@angular/router';//SE USA PARA CHILD ROUTES

const routes: Routes = [//DECLARING ALL ROUTES OF SITE
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent,
    children:[
      //USAR CHILDREN PARA SUBRUTAS POR SI ACASO
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}//REDIRIGE AL LOGIN
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }