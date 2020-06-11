import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../servicios/chat.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(public _cs:ChatService) { }

      Ingresar(proveedor:string){
        console.log(proveedor)
        this._cs.login(proveedor)
      
      }
      
    

  }
  //location.reload();
  //http://local.foo.com/politica.html
  //https://firechats-941e2.firebaseapp.com/condiciones.html