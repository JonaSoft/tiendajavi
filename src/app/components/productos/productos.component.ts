import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ProductosService} from '../../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto:any =[];

  constructor( private activateRoute:ActivatedRoute,
               private _producto:ProductosService ) { 
    this.activateRoute.params.subscribe(params =>{
      console.log(params['id']);
      this._producto.getProducto(params['id'])
      .subscribe(res =>{
        console.log(res);
        this.producto= res

      })

    })
  }

  ngOnInit(): void {
  }

}
