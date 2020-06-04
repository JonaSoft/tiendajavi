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

  constructor( private _productosServices: ProductosService,
                private _router:Router) { 
    this.inicioproductos = this._productosServices.getProductos()
    .subscribe(res=>{
      console.log(res)
      this.inicioproductos=res
    })
  }
  verProducto(idx:any){
    console.log(idx)
    idx=idx.toLowerCase()
    
    console.log(idx)
    if (idx==="audífonos"){
      idx="audifonos"
    }
    this._router.navigate(['productos', idx])
  }
  
  

}
