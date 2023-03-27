import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router,) { }

login(email:string, password :string){
    this.http.post("http://localhost:8000/api/login",{
      email:email,
      password:password
    }).subscribe(async res=>{
      localStorage.setItem('token', JSON.stringify(res))
       await this.router.navigate(['/dashboard']);
      location.reload();

    });
}

logout(){
  console.log('ab');

  localStorage.removeItem("token");
   this.router.navigateByUrl('/login');
  // location.reload();
}
  isUserLoggedIn(){
    if(localStorage.getItem("token")){
      return true
    }else{
      return false;
    }
  }
}
