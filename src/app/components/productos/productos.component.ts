import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductosService} from '../../servicios/productos.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  mostrarItem:boolean;
  producto:any=[];
  nombre:string;
  mostrar=true;

  constructor( private activateRoute:ActivatedRoute,
               private router: Router,
               private _producto:ProductosService ) { 
    this.mostrarItem=false;
    this.activateRoute.params.subscribe(params =>{
      console.log(params['id']);
      this.nombre= params['id'];
      //if (this.nombre==="audifonos")this.nombre="audífonos";
      //if (this.nombre==="camaras web")this.nombre="cámaras web";
      this.nombre= this.nombre.toUpperCase();
      this._producto.getProducto(params['id'])
      .subscribe(res =>{
        console.log(res);
        this.producto= res;
      })
    })
   
  }

  ngOnInit(): void {
   
  }
  Ir(){
    this.router.navigate(['/inicio'])
  }
  seleccionaItem(item:any){
    console.log(item)
    let categoria = item.img.substr(11)
    //let articulo = item.substr(11)
    //console.log(categoria.indexOf("/"))
    categoria = categoria.slice(0,categoria.indexOf("/"));
    console.log(categoria)
    this.router.navigate(['/productos/'+categoria+'/item',item.img])
    this.mostrarItem=true;
    setTimeout(() => {
      scroll(0,0);
    }, 200);
  }

}
