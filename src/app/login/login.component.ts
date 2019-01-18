import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/Usuario.model';


declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  recuerdame: boolean = false;
  email: string;

  auth2: any;


  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // Ingresar con Google
  googleInit () {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '160073853436-9rb6pme0r4ej11rekcsomv0322mhjf3g.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin ( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log( token );

      this._usuarioService.loginGoogle(token)
            .subscribe( () => window.location.href = '#/dashboard'); 
    });
  }

  // Ingresar al sistema y obtener el token de autenticación
  ingresar ( forma: NgForm ) {

    // Validamos el formulario
    if ( forma.invalid ) {
      return;
    }

    // Enviamos las credenciales del usuario para iniciar sesion
    // y obtener el token
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe(resp => this.router.navigate(['/dashboard']));

    // this._router.navigate(['/dashboard']);
  }

}
