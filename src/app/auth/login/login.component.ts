import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
                private authService: AuthService,
                private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  entrarLogin () {

    if ( this.loginForm.invalid) { return;}
    //Desestructuracion
    const { email, password } = this.loginForm.value;
    console.log ('Email: ', email, 'Password: ', password);
    this.authService.entrarLogin( email, password) // Recibimos una promesa
    .then ( credenciales => {
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


