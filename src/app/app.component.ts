import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  collapse = true;
  dropdown = true;
  
  constructor(private userService : UserService, private auth : AuthService, router : Router) {
    auth.user$.subscribe(user => {
      if(!user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
  ngOnInit() {
    setInterval(() => {
      let temp : string = document.getElementById("navbarsExampleDefault").className;
      let temps;
      if(document.getElementById("navBarDropDown")){
        temps = document.getElementById("navBarDropDown").className;
      }

      if(temps !== "nav-item dropdown show"){
        this.dropdown = false;
      }else{
        this.dropdown = true;
      }      
      
      if(temp !== "navbar-collapse collapse"){
        this.collapse = true;
      }else{
        this.collapse = false;
      }
    }, 100);
  }

}
