import { Injectable } from '@angular/core';
import { loginUser } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async login(userLogins: loginUser){
    let response = await fetch('http://localhost:8000/user/login', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userLogins)
    })

    const data = await response.json()
    console.log(data)

    let token = data.token
    
    localStorage.setItem('token', token)
    // console.log(token.username);
    


    return data

  }
}
