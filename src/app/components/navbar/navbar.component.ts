import { Component, OnInit } from '@angular/core';
//import { ProductosService } from '../../servicios/productos.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  buscaproducto:any=[];
  activa=false;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  buscador(idx:any){
    //console.log(idx)
    this.activa=true
    localStorage.setItem('buscador','si');
    idx=idx.toLowerCase()
    //console.log(idx)
    const productos=['accesorios','audifonos','billeteras','carcasas','celulares','control remoto','correas','higiene','juegos de mesa','mascarillas,mouses','parlantes','teclados'];
    
    if (idx==="audífonos"){
      idx="audifonos";
      this._router.navigate(['productos', idx]);

    } else{
      const found = productos.find(element =>element==idx)
      setTimeout(() => {
        this.activa=false;
        localStorage.removeItem('buscador');
        this._router.navigate(['productos', found])
      }, 2000);
      /*let caja= document.getElementById('inputbuscar');
      caja.innerHTML=""*/
    }
    
  }

}


