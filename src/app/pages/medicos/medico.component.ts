import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/Hospital.model';
import { Medico } from 'src/app/models/Medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRouted: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRouted.params.subscribe( params => {
      let id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarMedico( id );
      }


    });
   }

  ngOnInit() { 
    // cargar los hospitales en el dropdown
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => {
          this.hospitales = hospitales;
          console.log(this.hospitales);
        } );

    // subscripcion al evento del modal
    this._modalUploadService.notificacion
        .subscribe( (resp: any) => {
          this.medico.img = resp.medico.img;
        });

  }

  // =====================================
  // Guardar un medico 
  // =====================================
  guardarMedico( f: NgForm ) {
    console.log(f.valid);
    console.log(f.value);

    if ( f.invalid ) {
      return;
    } 

    this._medicoService.guardarMedico( this.medico )
          .subscribe( medico => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
          });
  }

  // =====================================
  // Carga al infromacion del hospital de
  // a cuerdo a la seleccion del select
  // =====================================
  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
        .subscribe( hospital  => this.hospital = hospital );
  }
  

  // =====================================
  // cargar medico por id
  // =====================================
  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
        .subscribe(medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital( this.medico.hospital );
          console.log(medico);

        });
  }

  // =====================================
  // Cambia la foto del medico
  // =====================================
  cambiarFoto () {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
}

