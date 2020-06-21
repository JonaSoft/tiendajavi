import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//importar servicio para subscripcion de mensajes
import { ChatService } from '../../servicios/chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(public _cs:ChatService,
              private _router:Router) { }


    inicio(){
        this._router.navigate(['inicio'])
    }

    Ingresar(proveedor:string){
      console.log(proveedor)
      this._cs.login(proveedor)
    }
      
    

  }
 