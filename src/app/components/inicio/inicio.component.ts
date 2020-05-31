import { Component, OnInit } from '@angular/core';
import { ProductosService} from '../../servicios/productos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  {
  public inicioproductos:any=[];

  constructor( private _productosServices: ProductosService) { 
    this.inicioproductos = this._productosServices.getProductos()
    .subscribe(res=>{
      console.log(res)
      this.inicioproductos=res
     
    })

    
      
  }

  
  

}
