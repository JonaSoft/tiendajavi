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
import { ProductosComponent } from './components/productos/productos.component';

import {  FirestochatsService } from "./servicios/firestochats.service";
import { CargaImagenesService } from './servicios/carga-imagenes.service';

import { APP_ROUTES } from './app.routes';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';


//servicios
import { ProductosService } from './servicios/productos.service';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactameComponent,
    NgDropFilesDirective,
    LoginComponent,
    RegistroComponent,
    ProductosComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    ItemComponent
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
    CargaImagenesService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
