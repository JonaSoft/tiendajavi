import { Component, OnInit } from '@angular/core';
import { ProductosService} from '../../servicios/productos.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  {
  public inicioproductos:any=[];
  activa=false
  mostrarslider=true;

  constructor( private _productosServices: ProductosService,
                private _router:Router) { 
    this.inicioproductos = this._productosServices.getProductos()
    .subscribe(res=>{
      console.log(res)
      this.inicioproductos=res
    })
    if(localStorage.getItem('buscador')){
        this.mostrarslider=false
    } else{
      setTimeout(() => {
        this.activa=true  
      }, 2000);
      this.activa=false  
    }
  }
  verProducto(idx:any){
    console.log(idx)
    idx=idx.toLowerCase()
    
    console.log(idx)
    /*if (idx==="audífonos"){
      idx="audifonos"
    }*/
    this._router.navigate(['productos', idx]);
    //let elemento = document.getElementById('navegador');
    setTimeout(() => {
      scroll(0,0);
    }, 200);
  }
  
  

}
