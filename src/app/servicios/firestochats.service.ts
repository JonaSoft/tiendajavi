import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';
import { User} from '../interfaces/user.interface';
import { Observable } from 'rxjs';

//para google
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/map';

@Injectable()

export class FirestochatsService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  private itemsUsers: AngularFirestoreCollection<User>;
  private itemsUsers1: AngularFirestoreCollection<User>;
  //public chats: Observable<any[]>;
  public chats: Mensaje[] = []; 
  //para google
  public usuario: any ={};
  ///-------------
  public users: User[]=[];
  public users1:Observable<User[]>
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth,

              private afs1: AngularFirestore,
              public db: AngularFirestore,
              public auth: AngularFireAuth,
              private router: Router) {

                this.afAuth.authState.subscribe( user =>{
                  console.log('Estado de Usuario', user);
                  if(!user){
                    console.log('lo bota');
                    return
                  }
                  console.log('guardo el usuario');
                  this.usuario.correo = user.email;
                  //console.log(this.usuario.correo)
                  localStorage.setItem('correo',this.usuario.correo)
                  this.usuario.nombre = user.displayName;
                  localStorage.setItem('email',this.usuario.nombre)
                  this.usuario.uid = user.uid;
                  localStorage.setItem('uid',this.usuario.uid)
                })


                this.itemsUsers1=afs1.collection<User>('users');
                this.users1=this.itemsUsers1.valueChanges();
                //location.reload(true);

              }

              login(proveedor:string) {
                if (proveedor==='google'){
                  setTimeout(async() => {
                    await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
                    //location.reload();  
                  }, 2000);
                  this.router.navigate(['contactame'])
                } else {
                  
                    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
                  
                }
              }
              
              logout() {
                console.log('saliendo');
                localStorage.removeItem('correo');
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('uid');
                this.usuario={}
                this.auth.signOut();
                this.router.navigate(['contactame'])
              }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                           .limit(10) );

    //retorna cambios en colecciones
    return this.itemsCollection.valueChanges().pipe(
                             map( (mensajes:Mensaje[]) =>{
                                console.log(mensajes)
                                console.log(localStorage.getItem('email'))
                                //this.chats=mensajes
                                this.chats=[];
                                for ( let mensaje of mensajes){
                                    //adiciona al inicio de la matriz

                                    if(mensaje.nombre === localStorage.getItem('email') || mensaje.nombre === "Javier Tapia"){
                                      this.chats.unshift(mensaje);
                                    }
                                    
                                }
                                return this.chats;
                              })
            )     
                            
  }
  
  cargarUsers(){
    
    return this.users1 = this.itemsUsers1.snapshotChanges()
    .pipe(map( changes =>{
        return changes.map( action =>{
          const data  = action.payload.doc.data() as User;
          //extraer el id del registro
          data.uid = action.payload.doc.id;
          //--------------------------------
          return data
        
        });
    }))
     
       
  }
  agregarMensajes(texto:string,usuarionombre:string, correo:string){
      let datamensaje: Mensaje = {
        mensaje:texto,
        nombre:usuarionombre,
        correo:correo,
        url:'',
        fecha:new Date().getTime(),
       
      }

      return this.itemsCollection.add(datamensaje);

  };
  agregarUsuario(email:any){
      let datauser: User = {
        email:email,
        fecha:new Date().getTime()
      }
      console.log('a grabar',datauser)

      this.db.collection("users").add(datauser)
      //return this.itemsUsers.add(datauser);
  }
}
