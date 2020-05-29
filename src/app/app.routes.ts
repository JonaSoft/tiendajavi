import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactameComponent } from './components/contactame/contactame.component';



const RUTAS: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'contactame', component:ContactameComponent},
    {path: '**',  redirectTo: 'inicio'},
];

export const APP_ROUTES = RouterModule.forRoot(RUTAS);