import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactameComponent } from './components/contactame/contactame.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ItemComponent } from './components/item/item.component'


const RUTAS: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'contactame', component:ContactameComponent},
    {
        path: 'productos/:id',
        component:ProductosComponent,
        children: [
            {path: 'item/:id', component:ItemComponent},
            {path: '**', pathMatch:'full', redirectTo: 'inicio'}
        ]
    },
    {path: '**',  redirectTo: 'inicio'},
];

export const APP_ROUTES = RouterModule.forRoot(RUTAS);