import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router ){}

  canActivate():Observable<boolean>{ // Devuelve un observable que resuelve un boolean
    // return false; // Quita permiso para entrar en una ruta
    // return true; // Da permiso para entrar en una ruta
    // return this.authService.isAuth(); //Devuelve observable con valor true o false.
  
     // El tap de rxjs sirve para disparar un efecto secundario
     return this.authService.isAuth()
      .pipe( // permite alterar o realizar acciones en base al resultado del observable
        tap( estado => { // estado es el booleano que devuelve el observable
          if ( !estado ) { this.router.navigate(['/login'])} // si es falso redirecciona
        })
      );
  
    }
 

}
