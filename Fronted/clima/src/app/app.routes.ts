import { Routes } from '@angular/router';
import { ClimaComponent } from './shared/componentes/clima/clima.component';

export const routes: Routes = [
    {
        path:'clima',
        component:ClimaComponent

    },
    {
       path:'',
       component:ClimaComponent 
    }
];