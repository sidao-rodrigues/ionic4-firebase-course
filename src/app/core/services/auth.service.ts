import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, AuthProvider, AuthOptions } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<firebase.User>;

  constructor(private aAuth: AngularFireAuth) { 
    this.authState$ = this.aAuth.authState;
  }

  public get isAuthenticate(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  public authenticate({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;

    if(provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }
    return operation;
  }

  public logout(): Promise<void> {
    return this.aAuth.auth.signOut();
  }

  private signInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this.aAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }: User): Promise<auth.UserCredential> { /*Isto { email, password, name } equivale a como se fosse um model, mas poderia criara um*/
    return this.aAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => 
        credentials.user.updateProfile({ displayName: name, photoURL: null })  
          .then(() => credentials)
      );
  }

  private signInWithPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch(provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
    }
    return this.aAuth.auth.signInWithPopup(signInProvider);
  }
}
