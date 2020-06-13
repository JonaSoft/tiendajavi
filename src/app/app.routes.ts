import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ItemComponent } from './components/item/item.component'
import { PoliticasComponent } from './components/politicas/politicas.component';
import { ChatsComponent } from './components/chats/chats.component';
import { LoginComponent } from './components/login/login.component';


const RUTAS: Routes = [
    {path: 'inicio', component: InicioComponent},
   
    {path: 'politicas', component: PoliticasComponent},
    {path: 'contacto', component: LoginComponent},
    //{path: 'chats', component: ChatsComponent},
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