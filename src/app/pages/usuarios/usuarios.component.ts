import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { registerContentQuery } from '@angular/core/src/render3';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0; 
  cargando: boolean = true;

  constructor( 
    public _usuarioService: UsuarioService,
    public _uploadModalService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._uploadModalService.notificacion
              .subscribe( resp => this.cargarUsuarios());
  }

  // =====================================
  // Cargar usuarios del sistema
  // =====================================
  cargarUsuarios () {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( ( resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
              });
  }

  // =====================================
  // Paginación de resultados
  // =====================================
  cambiarDesde ( valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios(); 
  }
  
  // =====================================
  // Búscar usuario
  // =====================================
  buscarUsuario ( termino: string ) {
    if ( termino.length === 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      }
    );
  }

  // =====================================
  // Actualizar el rol del usuario
  // =====================================
  actualizarUsuario (usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
              .subscribe();
  }

  // Borrar usuario 
  borrarUsuario (usuario: Usuario) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('Error al borrar!', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if (borrar) {
        // Eliminar el usuario
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( (borrado) => {
          console.log(borrado);
          this.cargarUsuarios();
          this.cargando = false;
        } );
      }
    } );

  }

  // =====================================
  // Mostrar el modal subir imagen
  // =====================================
  mostrarModal ( id: string) {
    console.log('el id', id);
    this._uploadModalService.mostrarModal('usuarios', id);
  }
}
