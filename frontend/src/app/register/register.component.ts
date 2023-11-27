import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../interfaces/user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUser!: FormGroup
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.registerUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  createUser() {
    let registerUser: UserDetails = this.registerUser.value
    this.auth.createUser(registerUser)
    this.router.navigate(['login'])
  }

}
