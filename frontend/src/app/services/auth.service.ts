import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createUser(user: UserDetails) {
    return this.http.post('http://localhost:8000/user/register', user).subscribe(res => {
      console.log(res);
      
    })
  }

}
