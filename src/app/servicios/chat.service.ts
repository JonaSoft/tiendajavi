import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[] =[];
  public usuario:any = {};
  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

                this.auth.authState.subscribe( user =>{

                    console.log('Estado del Usuario',user);
                    if(!user){
                      return
                    }
                    this.usuario.nombre = user.displayName;
                    this.usuario.correo = user.email;
                    this.usuario.uid = user.uid
                })
               }

  //desde login
  login(proveedor:string) {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario={}
    this.auth.signOut();
  }
              




  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc')
                                                                          .limit(10));
    return this.itemsCollection.valueChanges().pipe(
                                map( (mensajes: Mensaje[]) =>{
                                      console.log(mensajes);
                                      this.chats =[];
                                      for( let mensaje of mensajes){
                                          this.chats.unshift(mensaje);
                                      }
                                      //this.chats = mensajes
                                      return this.chats;
                                    })
                                )

  }
  agregarMensaje( texto:string){
    let mensaje:Mensaje ={
        nombre:this.usuario.nombre,
        mensaje: texto,
        correo:this.usuario.correo,
        fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);
  }
}
