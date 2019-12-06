import { Component, OnInit } from '@angular/core';
import { CognitoService } from "../../services/cognito.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any
  c: any

  constructor(private cognito: CognitoService) { 
   this.c = cognito.identity
  }

  ngOnInit() {
    this.data =  this.c
  }

}
