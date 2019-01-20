import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { triggerAsyncId } from 'async_hooks';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  // Guardar cambios
  guardar (usuario: Usuario) {

    // Verificamos que el usuario no sea de google
    // en tal caso puede actualizar el correo

    if (! this.usuario.google) {
      this.usuario.email = usuario.email;  
    }
    
    this.usuario.nombre = usuario.nombre;
    

    this._usuarioService.actualizarUsuario(this.usuario)
                .subscribe();
  }

  seleccionImagen ( archivo: File ) {
    if ( ! archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal('Error! Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = String(reader.result);

    this.imagenSubir = archivo;
    
  }


  cambiarImagen () {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
