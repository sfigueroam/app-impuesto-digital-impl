import { Component, OnInit } from '@angular/core';
import { CognitoService } from "../../services/cognito.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDataService } from "../../services/user-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  identity: any;
  name: any;
  exp: Date;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router,
              private userDataService: UserDataService) { 

                this.cognito.login(route.snapshot.fragment).then(
                  value => {
                    this.identity = value;
                    this.name = value.name;
                    if(this.name == undefined || this.name == null){
                      this.name = value.username;
                    }

                    this.router.navigate(['/main']);
                  }
                );
            
                console.log("IDENTITY")
                console.log(cognito.identity)
                console.log("NAME")
                console.log(this.name)
                console.log("EXP")
                console.log(this.exp)
                console.log("FRAGMENT")
                console.log(route.snapshot.fragment);
              } 
            
ngOnInit() {
  
  this.exp = this.cognito.getExpirationDate();
  this.userDataService.nombre_usuario = this.name;
  
}




}