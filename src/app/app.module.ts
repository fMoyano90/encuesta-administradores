import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// RUTAS

import { APP_ROUTING } from './app.routes';

// COMPONENTES

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { CrearAdminComponent } from './components/crear-admin/crear-admin.component';
import { UpdateAdminComponent } from './components/update-admin/update-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { CallbackPipe } from './pipes/callback.pipe';
import { CorreoAdminComponent } from './components/correo-admin/correo-admin.component';
import { EncuestaAdminComponent } from './components/encuesta-admin/encuesta-admin.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestaRespuestaComponent } from './components/encuesta-respuesta/encuesta-respuesta.component';
import { BuenoComponent } from './components/bueno/bueno.component';
import { IntermedioComponent } from './components/intermedio/intermedio.component';
import { MaloComponent } from './components/malo/malo.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { AdminItemComponent } from './components/admin-item/admin-item.component';
import { AdministradorService } from './services/administrador.service';
import { RespuestasBuenasComponent } from './components/respuestas-buenas/respuestas-buenas.component';
import { RespuestasIntermediasComponent } from './components/respuestas-intermedias/respuestas-intermedias.component';
import { RespuestasMalasComponent } from './components/respuestas-malas/respuestas-malas.component';
import { ResultadosAdminComponent } from './components/resultados-admin/resultados-admin.component';
import { EncuestaDosComponent } from './components/encuesta-dos/encuesta-dos.component';
import { EncuestaTresComponent } from './components/encuesta-tres/encuesta-tres.component';
import { TipoComentarioComponent } from './components/tipo-comentario/tipo-comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    AdministradoresComponent,
    CrearAdminComponent,
    UpdateAdminComponent,
    AdminDetailComponent,
    DateAgoPipe,
    CallbackPipe,
    CorreoAdminComponent,
    EncuestaAdminComponent,
    EncuestaComponent,
    EncuestaRespuestaComponent,
    BuenoComponent,
    IntermedioComponent,
    MaloComponent,
    GraciasComponent,
    UsuariosComponent,
    UpdateUserComponent,
    ResultadosComponent,
    BuscarComponent,
    AdminItemComponent,
    RespuestasBuenasComponent,
    RespuestasIntermediasComponent,
    RespuestasMalasComponent,
    ResultadosAdminComponent,
    EncuestaDosComponent,
    EncuestaTresComponent,
    TipoComentarioComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [AdministradorService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
