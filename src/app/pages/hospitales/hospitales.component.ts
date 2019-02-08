import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/Hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }


  // =====================================
  // Cargar los hospitales
  // =====================================
  cargarHospitales () {
    this.cargando = true;
    console.log(this.desde);
    this._hospitalService.cargarHospitales( this.desde )
              .subscribe( ( resp: any ) => {
                this.hospitales = resp;
                this.totalRegistros = this._hospitalService.totalRegistros;
                this.cargando = false;
              });
  }

  // =====================================
  // Búscar hospital por nombre
  // =====================================
  buscarHospital ( termino: string ) {

  }
  // =====================================
  // Paginación de resultados
  // =====================================
  cambiarDesde ( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros || desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarHospitales();
  }

  // =====================================
  // Crear hospital
  // =====================================
  crearHospital (  ) {
      
    swal({
      text: 'Crear un nuevo Hospital',
      content: 'input',
      button: {
        text: 'Crear Hospital',
        closeModal: false,
      },
    })
    .then( (nombre: string) => {
      if ( nombre === '' ) {
        swal(
          'Ups!, Error al crear el hospital', 
          'El nombre es requerido!, intenta de nuevo', 
          'error');
      } 
      
      let hospital = new Hospital(nombre);

      this._hospitalService.crearHospital(hospital)
                .subscribe( ( resp: any ) => {
                  swal(
                    'Hospital creado!',
                    `El hospital ${resp.nombre} ha sido creado`,
                    'success');
                    this.cargarHospitales();
                });
    })
    .catch(err => {
      if (err) {
        swal('Error', 'Error al cargar el componente', 'error');
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  }

  // =====================================
  // Actualizar hospital
  // =====================================
  actualizarHospital ( hospital: Hospital ) {
    if (hospital.nombre === '') {
      swal('Error!', 'El nombre del hospital es requerido!', 'success');
      return;
    }

    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }


  // =====================================
  // Borrar un hospital
  // =====================================
  borrarHospital ( hospital: Hospital ) {
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if (borrar) {
        // Eliminar el hospital
        this._hospitalService.borrarHospital( hospital._id )
        .subscribe( (borrado) => {
          console.log(borrado);
          this.cargarHospitales();
          this.cargando = false;
        } );
      }
    } );
  }


  // =====================================
  // Cambiar la iamgen del hospital
  // =====================================
  mostrarModal ( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }





}
