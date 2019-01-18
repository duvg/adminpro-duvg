import { Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Propiedades para verificar si el usuario esta logueado
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  // Verifica si un usuario esta autenticado
  estaLogueado () {
    return (this.token.length > 5 ) ? true : false;
  }
  
  // Carga los datos del localStorage
  cargarStorage () {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage (id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  // Login google
  loginGoogle (token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token: token}).pipe(
      map( ( resp: any ) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return;
      })
    );
  }
  // Cerrar sesion
  logout () {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }
  // Inicio de sesion
  login (usuario: Usuario, recuerdame: boolean = false) {
    
    // Recordar el usuario
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

     let url = URL_SERVICIOS + '/login';

     return this.http.post(url, usuario).pipe(
       map((resp: any) => {
         console.log(resp);
          // TODO: llamar el storage
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
         })
    );
  }

  crearUsario (usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario`;
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', resp.usuario.email, 'success');
        return resp.usuario;
      })
    );
  }
}


