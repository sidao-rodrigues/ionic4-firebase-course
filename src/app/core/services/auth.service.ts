import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private aAuth: AngularFireAuth) { }

  private signInWithEmail({ email, password }): Promise<auth.UserCredential> {
    return this.aAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }): Promise<auth.UserCredential> { /*Isto { email, password, name } equivale a como se fosse um model, mas poderia criara um*/
    return this.aAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => 
        credentials.user.updateProfile({ displayName: name, photoURL: null })  
          .then(() => credentials)
      );

  }
}
