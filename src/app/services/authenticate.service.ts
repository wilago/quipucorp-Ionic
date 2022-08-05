import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  userToken: string;

  constructor(private http: HttpClient, private storage: Storage) {}

  newUser(user) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };
    return this.http.post(environment.urlRegister, authData).pipe(
      map((resp) => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  login(user) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };
    return this.http.post(environment.urlLogin, authData).pipe(
      map((resp) => {
        console.log('paso pod el pipe');
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    this.storage.set('token', idToken);
    this.storage.set('isUserLoggedIn', true);
    console.log('guardo el token');
  }

  private async readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = await this.storage.get('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
