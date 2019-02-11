import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


const pagesRoutes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Dashboard'} 
  },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },      
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
  { 
    path: 'perfil', 
    component: ProfileComponent, 
    canActivate: [ VerificaTokenGuard ],
    data: { title: 'Perfil de usuario'} 
  },
  { 
    path: 'busqueda/:termino', 
    component: BusquedaComponent, 
    canActivate: [ VerificaTokenGuard ],
    data: { title: 'Buscador'} 
  },

  // Mantenimientos 
  { 
    path: 'usuarios', 
    component: UsuariosComponent, 
    canActivate: [ AdminGuard, VerificaTokenGuard ],
    data: { titulo: 'Mantenimiento de Usuarios' } 
  },

  { 
    path: 'hospitales', 
    component: HospitalesComponent, 
    canActivate: [ VerificaTokenGuard ],
    data: { titulo: 'Mantenimiento de Hospitales' } 
  },
  { 
    path: 'medicos', 
    component: MedicosComponent, 
    canActivate: [ VerificaTokenGuard ],
    data: { title: 'Mantenimiento de medicos' } 
  },
  { 
    path: 'medico/:id', 
    component: MedicoComponent, 
    canActivate: [ VerificaTokenGuard ],
    data: { title: 'Actualizar medico' } 
  },
 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
