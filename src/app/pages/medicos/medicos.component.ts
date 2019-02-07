import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/Medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos ();
  }

  // =====================================
  // Carga todos los medicos
  // =====================================
  cargarMedicos () {
    this._medicoService.cargarMedicos()
            .subscribe( medicos => this.medicos = medicos);
  }


  // =====================================
  // Búscar medico por nombre
  // =====================================
  buscarMedico ( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();  
      return;
    }
    this._medicoService.buscarMedico( termino )
            .subscribe( medicos => this.medicos = medicos);
  }

  // =====================================
  // Borrar medico
  // =====================================
  borrarMedico ( medico: Medico) {
    this._medicoService.borrarMedico ( medico._id )
          .subscribe( () => this.cargarMedicos());
  }
}
