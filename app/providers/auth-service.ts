import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import 'rxjs/Rx';

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthService {

  //TODO: Setup provider for constant
  LOGIN_URL:string = 'http://127.0.0.1:8000/v1/token';
  local:Storage = new Storage(LocalStorage);
  jwtHelper:JwtHelper = new JwtHelper();
  contentHeader:Headers = new Headers({"Content-Type": "application/json"});
  data:Object;

  constructor(private http:Http,
              private events:Events) {
    this.http = http;
    this.data = null;
  }

  authenticated() {
    return tokenNotExpired();
  }

  login(credentials) {
    // credentials is {email: XXX, password: XXX}
    return this.http.post(this.LOGIN_URL,
      JSON.stringify(credentials), {headers: this.contentHeader})
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.token),
        err => {
          //TODO: Do something!  Toast? Alert?
          console.error(err)
        }
      );
  }

  authSuccess(token) {
    this.local.set('id_token', token);
    this.local.set('profile', this.jwtHelper.decodeToken(token))
    this.events.publish('user:login');

  }

  logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.events.publish('user:logout');

  }

}

