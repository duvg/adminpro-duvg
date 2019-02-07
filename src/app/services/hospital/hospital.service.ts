import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Hospital } from '../../models/Hospital.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalRegistros: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  // =====================================
  // Carga todos los hospitales
  // =====================================
  cargarHospitales ( desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalRegistros = resp.total;
        return resp.hospitales;
      })
    );
  }

  // =====================================
  // Búsca un hospital por id
  // =====================================
  obtenerHospital (id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return  this.http.get(url).pipe(
      map( (resp: any) =>  resp.hospital)
    );
  }

  // =====================================
  // Crear nuevo hospital
  // =====================================
  crearHospital (hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital';
    
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, hospital).pipe(
      map( (resp: any) => {
        swal('Hospital creado', resp.hospital.nombre, 'success');
        return true;
      })
    );
  }

  // =====================================
  // Actualizar hospital
  // =====================================
  actualizarHospital (hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    console.log(url);
    url += '?token=' + this._usuarioService.token;
    console.log(hospital);
    return this.http.put(url, hospital).pipe(
      map( (resp) => {
        swal(
          'Hospital actualizado!',
          'El hospital ha sido actualizado',
          'success'
        );
        return true;
      })
    );
  }

  // =====================================
  // Borrar un hospital 
  // =====================================
  borrarHospital (id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete(url).pipe(
      map( (resp: any) => {
        swal(
          'Hospital borrado', 
          `El hospital ${resp.hospital.nombre} ha sido eliminado`,
          'success');
          return true;
      })
    );
  }

  // =====================================
  // Buscar hospital por termino
  // =====================================
  buscarHospital (termino) {
    let url = URL_SERVICIOS + '/buscar/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map( ( resp: any ) => resp.hospitales )
    );
  }
  
}
