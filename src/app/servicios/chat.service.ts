import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[] =[];
  public usuario:any = {};
  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth,
              public router: Router) {

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
    if(proveedor==="facebook"){
      console.log('ingreso a web');
      this.router.navigate(['https://www.facebook.com/profile.php?id=100034770665438']);
      return
    }
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }
  logout() {
    this.usuario={}
    this.auth.signOut();
  }
              

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc')
                                                                          .limit(10));
    this.bienvenida()

    return this.itemsCollection.valueChanges().pipe(
                map( (mensajes: Mensaje[]) =>{
                  console.log(mensajes);
                  this.chats =[];
                  for( let mensaje of mensajes){
                    if(this.usuario.correo == "latiendadejavi1@gmail.com"){
                        
                        for( let mensaje1 of mensajes){
                            this.chats.unshift(mensaje1)
                        }
                      return this.chats
                    } else{
                        if(mensaje.correo==this.usuario.correo || mensaje.correo=="latiendadejavi1@gmail.com" || mensaje.fecha==new Date().getTime()){
                          this.chats.unshift(mensaje);
                        }
                        //return this.chats  
                    }
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
  bienvenida(){
    let mensaje:Mensaje ={
      nombre:'Javier Tapia',
      mensaje: 'Hola en que te ayudo?',
      correo:'latiendadejavi1@gmail.com',
      fecha: new Date().getTime()
    }
    this.itemsCollection.add(mensaje);
  }
}
