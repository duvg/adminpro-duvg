import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    console.log('token guard');
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expirado = this.expirado(payload.exp);

    // si esta expirado lo sacara al login
    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    } 
    return this.verificaRenueva( payload.exp );
  }
  
  // =====================================
  // Verifica para renovar el token
  // =====================================
  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );
      
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            reject(false);
            this.router.navigate(['/login']);
          });
      }

      resolve( true );
    });
  }

  // =====================================
  // Verificar fecha expiracion del token
  // =====================================
  expirado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;
    
    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }
}
