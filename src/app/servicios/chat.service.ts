import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public itemsCollection: AngularFirestoreCollection<Mensaje>;
  //
  public clientes: Observable <Mensaje[]>;
  //
  public chats:Mensaje[] =[];
  public usuario:any = {};
  public uidBienvenida:string;
  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth,
              public router: Router) {

                this.itemsCollection=afs.collection<Mensaje>('chats');
                this.clientes=this.itemsCollection.valueChanges();


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
  
  llamaUid(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc')
                                                                          .limit(10));
    this.bienvenida()
    return this.clientes = this.itemsCollection.snapshotChanges()
    .pipe(map( changes =>{
        return changes.map( action =>{
          const data  = action.payload.doc.data() as Mensaje;
          //extraer el id del registro
          data.uid = action.payload.doc.id;
          //--------------------------------
          console.log(data)

          //this.chats = [];
          //this.chats.unshift(data)
          //return      
          return data
          //return console.log(data)
        });
    }))
    //console.log(this.clientes)

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
    this.itemsCollection.doc(this.uidBienvenida).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    setTimeout(() => {
      this.usuario={};
      this.auth.signOut();
     
    }, 1000);
    
  }
              

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc')
                                                                          .limit(10));
    this.bienvenida();

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
    this.itemsCollection.add(mensaje)
    .then((docRef)=>{
      console.log(docRef.id);
      this.uidBienvenida = docRef.id
    })
  }
}
