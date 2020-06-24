import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 
  constructor( private http: HttpClient) {
    console.log('listo para usar')
     

   }
   getProductos(){

    return this.http.get('assets/inicio.json')
    
   }
   getProducto(articulo:any){
   console.log(articulo)
   //if(articulo==='audifonos') articulo = 'audífonos';
   return this.http.get(`assets/${articulo}.json`)

   }
}
