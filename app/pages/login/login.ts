import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';
import {AuthService} from '../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav: NavController,
              private userData: UserData,
              private auth: AuthService) {
  }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.auth.login(form.form.value)
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
