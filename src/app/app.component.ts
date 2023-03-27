import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-angular';
  userLogged:boolean=false;
  constructor(private api :AuthService){}
  ngOnInit(){

    this.userLogged=this.api.isUserLoggedIn();
  }
}
