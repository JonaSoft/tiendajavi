import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//importar servicio para subscripcion de mensajes
import { ChatService } from '../../servicios/chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent  {
  mensaje:string='';
  elemento:any;
  chats: Observable<any[]>;
  constructor(firestore: AngularFirestore,
              public _cs: ChatService,
              private _router:Router) {
      this.chats = firestore.collection('chats').valueChanges();
      //llamando desde chat.service
      /*this._cs.bienvenida()
                .then(()=>{
                  console.log('bienvenida enviada')
                })
                .catch((err)=>{console.error('Error bienvenida',err)});*/
      this._cs.cargarMensajes()
                .subscribe(()=>{
                  this.elemento = document.getElementById('app-mensajes');
                  setTimeout(() => {
                    this.elemento.scrollTop = this.elemento.scrollHeight;  
                  }, 50);
                  
                })
  }
  inicio(){
    this._router.navigate(['inicio'])
  }
  enviarMensaje(){
    console.log(this.mensaje)
    if (this.mensaje.length === 0){
        return
    }
    this._cs.agregarMensaje(this.mensaje)
            .then(()=>{
              console.log('Mensaje Enviado');
              this.mensaje="";
              this.reproducir()
            })
            .catch((err)=>{console.error('Error al enviar',err)});
  }
  reproducir() {
    const audio = new Audio('assets/sound/iphone.mp3');
    audio.play();
  }
}
