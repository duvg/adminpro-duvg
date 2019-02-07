import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/Medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalRegistros: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService

  ) { }

  // =====================================
  // Cargar todos los medicos
  // =====================================
  cargarMedicos ( desde: number = 0) {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url).pipe(
      map( ( resp: any ) => {
        this.totalRegistros = resp.total;
        console.log(resp.medicos);
        return resp.medicos;

      })
    );
    
  }

  // =====================================
  // Búscar medicos por el nombre
  // =====================================
  buscarMedico ( termino:  string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url ).pipe(
      map( ( resp: any ) => resp.medicos)
    );
  }

  // =====================================
  // Borrar un medico
  // =====================================
  borrarMedico ( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url ).pipe(
      map( resp => {
        swal('Medico Borrado!', 'El medico ha sido eliminado del sistema', 'success');
        return resp;
      })
    );
  }
  // =====================================
  // Guardar un medico en la base de datos
  // sirve apra guardar acutualizar 
  // un medico
  // =====================================
  guardarMedico ( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';
    if ( medico._id) {
      // Actualizar registro
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico).pipe(
        map( (resp: any) => {
          swal('Medico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      // Crear registro
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico).pipe(
          map( (resp: any ) => {
            swal('Medico creado', medico.nombre, 'success');
            return resp.medico;
          } )
      );
    }
    
  }

  // =====================================
  // buscar medico por id
  // =====================================
  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.medico)
    );
  }
}
