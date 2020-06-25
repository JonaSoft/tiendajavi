import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  imagen:string
  

  constructor(private activateRoute:ActivatedRoute,
              private _router:Router) {
    this.activateRoute.params.subscribe(params =>{
      console.log(params['id']);
      this.imagen = params['id'];
    })
   }

  ngOnInit(): void {
  }
  alInicio(){
    this._router.navigate(['/inicio'])
  }
  alContacto(){
    this._router.navigate(['/contacto'])
  }
  alProducto(){
    console.log(this.imagen);
    let producto = this.imagen.substr(11);
    producto = producto.slice(0,producto.indexOf("/"));
    console.log(producto);
    this._router.navigate(['/productos',producto])
    //this._router.navigateByUrl('/productos/'+producto)
    //console.log('antes')
  
    location.reload();
  
   
  }
}
