import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // resltado de retorno de la promesa
    this.contarTres().then(
      mensaje => console.log('Finalizado', mensaje)
    ).catch( error => console.log('error', error) );
   }

  ngOnInit() {
  }

  contarTres (): Promise<boolean> {
    // definicion de la promesa
    return new Promise ( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('error programado por el usuario');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
