import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { } // Inyectamos autentificacion de FireBase

  initAuthListener() { // Avisa cuando hay cambios en autentificacion
    // Recoge información para permitir el acceso a rutas permitidas del perfil de usuario

    this.auth.authState.subscribe( fuser => { // Es un observable
      console.log(fuser); // diminutivo de firebase user
      console.log( fuser?.uid); //El signo ? dice que si es null no lo imprima. Evita error
      console.log ( fuser?.email);
    })
  }


  crearUsuario( nombre:string, email:string, password:string) {

    //console.log('desde el servicio', { nombre, email, password });

    // Enviamos nuevo usuario a FireBase y recibimos respuesta en forma promesa
    return this.auth.createUserWithEmailAndPassword( email, password ) //Devuelve una promesa
            //.then( fbUser => { // Aqui están las credenciales del usuario desde Firebase
            .then( ({ user }) => { // Desestructuracion de fbUser
              //Creamos la instancia del modelo Usuario para el objeto de datos newUser
              const newUser = new Usuario( user!.uid, nombre, user!.email );
              
              // Guardamos el objeto de usuario desestructurado
              // en su ruta
              // dentro de documento del usuario en concreto
              return this.firestore.doc(`${ user!.uid }/usuario`)
              .set ({...newUser});

            })
  
  }

  entrarLogin(email: string, password: string){
    // Enviamos para que valide usuario y devuelve respuesta
    return this.auth.signInWithEmailAndPassword ( email, password );

  }

  logout(){
    return this.auth.signOut(); // Cierra el usuario de Firebase
  }

  // Devuelve true si hay datos de usuario o false si no los hay
  isAuth(){
    return this.auth.authState.pipe( // devuelve observable con los datos del usuario
                                   // necesitamos el pipe para extraer si usuario está validado o no
    map( fbUser => fbUser!= null ) //Devuelve true si no es null. Que tiene usuario
  )}
}
