import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = { email: '', password: '' };
  loggedInState = false;
  successMessage = '';
  errorMessage = '';
  loggingIn = false;
  loggedIn = false;
  link = '';

  constructor(
    private userService: UserService,
    private service: LoginService,
    private router: Router
  ) {}

  async onSubmit() {
    const userData = {
      email: this.userData.email,
      password: this.userData.password,
    };

    console.log(userData);
    

    try {
      let response = await this.service.login(userData);
      console.log(response.message);
      
      if (response.error) {
        console.log(response.error);
        
        this.loggingIn = false;
        
            
        let  newMess=this.errorMessage = response.error;
        console.log(newMess);

        setTimeout(() => {
          this.errorMessage = '';
          this.loggingIn = false;
        }, 3000);
      } else if (response.message) {

        this.loggedInState = true;
       let succ= this.successMessage = response.message;
      //  console.log(succ);
       
        this.loggedIn = true;

        localStorage.setItem('loggedIn', `${this.loggedIn}`);

        let role = await this.userService.checkDetails();

        console.log(role);

        setTimeout(async () => {
          this.successMessage = response.message;
          this.loggedInState = false;
          this.loggedIn = true;

          if (role == 'admin') {
            this.router.navigate(['admin']);
          } else if (role == 'customer') {
            this.router.navigate(['customer']);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}
