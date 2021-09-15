import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})

export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( private fb: FormBuilder,
                private authService: AuthService, // Inyectamos el servicio
                private router: Router ) { }  

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required],
      correo:   ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }





  crearUsuario() {

    if ( this.registroForm.invalid ) { return; } // Si el formulario no es completo. Sale

    // Desestructuracion de objetos 
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario( nombre, correo, password) // Enviamos al metodo del servicio
      .then( credenciales =>{ // Recibimos una promesa desde FireBase con datos como uid, token...
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch (err =>{Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
        
      })} );
  }
}
