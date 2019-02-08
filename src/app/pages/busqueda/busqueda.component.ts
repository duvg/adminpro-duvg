import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/Usuario.model';
import { Medico } from 'src/app/models/Medico.model';
import { Hospital } from '../../models/Hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params
      .subscribe( parmas => {
        let termino = parmas.termino;
        this.buscar(termino);
      });

  }

  ngOnInit() {
  }

  buscar( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
