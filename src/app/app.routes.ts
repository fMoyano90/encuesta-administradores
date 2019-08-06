// IMPORT NECESARIOS

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// IMPORTAR COMPONENTES

import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { CrearAdminComponent } from './components/crear-admin/crear-admin.component';
import { UpdateAdminComponent } from './components/update-admin/update-admin.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { BuenoComponent } from './components/bueno/bueno.component';
import { IntermedioComponent } from './components/intermedio/intermedio.component';
import { MaloComponent } from './components/malo/malo.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { RespuestasBuenasComponent } from './components/respuestas-buenas/respuestas-buenas.component';
import { RespuestasIntermediasComponent } from './components/respuestas-intermedias/respuestas-intermedias.component';
import { RespuestasMalasComponent } from './components/respuestas-malas/respuestas-malas.component';
import { ResultadosAdminComponent } from './components/resultados-admin/resultados-admin.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'administradores', component: AdministradoresComponent},
    { path: 'crear-admin', component: CrearAdminComponent},
    { path: 'administrador/:id', component: AdminDetailComponent},
    { path: 'editar-administrador/:id', component:  UpdateAdminComponent},
    { path: 'encuesta/:id', component: EncuestaComponent },
    { path: 'encuesta/bueno/:id', component: BuenoComponent },
    { path: 'encuesta/intermedio/:id', component: IntermedioComponent },
    { path: 'encuesta/malo/:id', component: MaloComponent },
    { path: 'encuesta/misrespuestas/:id', component: ResultadosAdminComponent},
    { path: 'gracias', component: GraciasComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'editar-usuario/:id', component:  UpdateUserComponent},
    { path: 'resultados', component:  ResultadosComponent},
    { path: 'resultados/buenos', component:  RespuestasBuenasComponent},
    { path: 'resultados/intermedios', component:  RespuestasIntermediasComponent},
    { path: 'resultados/malos', component:  RespuestasMalasComponent},
    { path: 'buscar/:termino', component: BuscarComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});

