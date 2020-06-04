import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestochatsService } from '../../servicios/firestochats.service'
import { AuthService} from '../../servicios/auth.service';
import { FileItem } from  '../../models/file-item'
import { CargaImagenesService } from 'src/app/servicios/carga-imagenes.service';
//para ver imagen e4n el chat
export interface Item { email:string;nombre: string; url:string}


@Component({
  selector: 'app-Contactame',
  templateUrl: './contactame.component.html',
  styleUrls: ['./contactame.component.css']
})
export class ContactameComponent implements OnInit {

//archivos images sobre el input
  estaSobreInput = false;
  archivos: FileItem[]=[];
  activatexto= false;
 


//******************************************

  
  public elemento:any;
  mensaje:string ="";
  public usuarionombre:string="";
  public correo:string="";
  public chats: Observable<any[]>;
  public mensajes:any[]=[];
  public users: Observable<any[]>;
  public usuarios=[];
  private itemsCollection: AngularFirestoreCollection<Item>
  items: Observable<Item[]>;
  constructor(  private auth:AuthService,
                private router:Router,
                public db: AngularFirestore,
                public afs: AngularFirestore,
                public _cs: FirestochatsService,
                public _usuario: AuthService,
                public _cargaImagenes: CargaImagenesService
             )
       {
        this.itemsCollection = afs.collection<Item>('img');
        this.items = this.itemsCollection.valueChanges(); 
        this.usuarionombre = this._usuario.leerEmail() 
        //oir cambios en collecciones de chats            
        this.chats = db.collection('chats').valueChanges();
        //console.log('chats',_cs.chats)
        //this.users = db.collection('users').valueChanges();
    
        //cargar mensajes desde el servicio
        this._cs.cargarMensajes()
          .subscribe( (res)=>{
            //console.log(res.length)
            //console.log('mensajes',res[7].nombre)
            //console.log(localStorage.getItem('email'))
            let elementos = res.length
            elementos=elementos-1
            //console.log(elemento)
            if (elementos!=-1){
              if (res[elementos].nombre!=localStorage.getItem('email')){
               // this.reproducir()
              }
              this.elemento = document.getElementById('app-mensajes');
            
            }
            this.elemento = document.getElementById('app-mensajes');
            setTimeout(() => {
              this.elemento.scrollTop = this.elemento.scrollHeight;
            
            },3500);
                  
                  
            });

         
       }

  ngOnInit() {
    //this.elemento = document.getElementById('app-mensajes');
    if(localStorage.getItem('uid') || (localStorage.getItem('email'))){
      //this.auth.logout();
      //this.router.navigateByUrl('/inicio')
      //this.router.navigateByUrl('/login')
      //window.location.reload();
      this.elemento = document.getElementById('app-mensajes');
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      
      },3500);
      }
  }
  enviarMensaje(){

    console.log(this.mensaje);
    if (this.mensaje.length === 0){
      return
    }
    this.usuarionombre = this._usuario.leerEmail()
    this.correo = localStorage.getItem('correo') 
    console.log('es igual q servicio',this.usuarionombre)
    this._cs.agregarMensajes(this.mensaje,this.usuarionombre,this.correo)
      .then(()=>{
        this.mensaje=""
        
      })
      .catch((err)=>console.log(err))
      this.elemento = document.getElementById('app-mensajes');
      console.log(this.elemento)
      //this._cargaImagenes.cargarImagenesFirebase(this.archivos)  
      this.elemento.scrollTop = this.elemento.scrollHeight;
  }
  
  
    
  reproducir() {
    const audio = new Audio('assets/sound/iphone.mp3');
    audio.play();
  }

// para cargar imagenes 
cargarImagenes(){
  this._cargaImagenes.cargarImagenesFirebase(this.archivos)
  
  
}
pruebaSobreInput( event){
  //console.log('aqui trabaja',event)
  if(!event){
    this._cargaImagenes.cargarImagenesFirebase(this.archivos)  
  }
}



}
