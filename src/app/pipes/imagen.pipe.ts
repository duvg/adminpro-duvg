import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { BrowserStack } from 'protractor/built/driverProviders';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    // Retornamos la imagen por defecto
    if ( !img ) {
      return url + '/usuarios/default';
    }

    // Si la imagen viene de google la retornamos tal cual
    if ( img.indexOf('https') >= 0 ) {
       return img; 
    }

    // Retornamos la imagen del sistema de acuerdo a su tipo
    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medico, hospitales');
        url += '/usuarios/default';
        break;
    }

    return url;
  }

}
