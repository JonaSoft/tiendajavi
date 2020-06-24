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
  mensaje=false;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  buscador(idx:any){
    //console.log(idx)
    this.activa=true
    localStorage.setItem('buscador','si');
    idx=idx.toLowerCase()
    //console.log(idx)
    const productos=['accesorios','audífonos','audifonos','billeteras','cámaras','camaras','carcasas','celulares','control remoto','correas','higiene','juegos de mesa','mascarillas,mouses','parlantes','teclados'];
    console.log(idx)
    
    if (idx==="audifonos"){
      idx="audífonos";
      //console.log('audifonos')
      setTimeout(() => {
        this.activa=false;
        localStorage.removeItem('buscador');
        this._router.navigate(['productos', idx]);  
      }, 2000);
      
    };
    if(idx==="camaras" || idx==="cámaras"){
        idx="cámaras web";
        setTimeout(() => {
          this.activa=false;
          localStorage.removeItem('buscador');
          this._router.navigate(['productos', idx]);  
        }, 2000);
    } else{
      const found = productos.find(element =>element.includes(idx))
        if(found){
          setTimeout(() => {
            this.activa=false;
            localStorage.removeItem('buscador');
            this._router.navigate(['productos', found]);
          }, 2000);
        } else {
          setTimeout(() => {
            this.activa=false;
            localStorage.removeItem('buscador');
            this._router.navigate(['productos', 'accesorios']);
            this.mensaje=true;
          }, 2000);

          setTimeout(() => {
            this.mensaje=false;
          }, 8000);
        }
      
      /*let caja= document.getElementById('inputbuscar');
      caja.innerHTML=""*/
    }
    
  }

}


