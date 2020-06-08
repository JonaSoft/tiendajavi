import { Component, OnInit } from '@angular/core';
import { FirestochatsService} from '../../servicios/firestochats.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(public  _cs: FirestochatsService) { }

      ingresar(proveedor:string){
        console.log(proveedor)
        this._cs.login(proveedor)
      
      }
    

  }
  //location.reload();
  //http://local.foo.com/politica.html
  //https://firechats-941e2.firebaseapp.com/condiciones.html