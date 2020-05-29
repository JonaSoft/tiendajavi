import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactameComponent } from './components/contactame/contactame.component';

import {  FirestochatsService } from "./servicios/firestochats.service";
import { CargaImagenesService } from './servicios/carga-imagenes.service';

import { APP_ROUTES } from './app.routes';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactameComponent,
    NgDropFilesDirective,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
    FirestochatsService,
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }