import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  // variables
  progreso1: number = 25;
  progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // metodos
  // revice el event emitido y establece lso valores en una funcion
  // actualizar ( event: number ) {
  //   console.log('Evento: ', event);
  // }


}
