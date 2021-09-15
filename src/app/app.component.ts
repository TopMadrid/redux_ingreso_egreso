import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresoApp';

  constructor( private authService: AuthService ){

    // LLama al metodo que controla el cambio de estado del usuario
    this.authService.initAuthListener(); 
  }
}
