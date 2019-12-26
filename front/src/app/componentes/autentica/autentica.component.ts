import { Component, OnInit } from '@angular/core';
import {CognitoService} from '../../servicios/cognito.service';

@Component({
  selector: 'app-autentica',
  templateUrl: './autentica.component.html',
  styleUrls: ['./autentica.component.scss']
})
export class AutenticaComponent implements OnInit {

  constructor(private cognito: CognitoService) { }

  ngOnInit() {
    this.cognito.redirectLogin();
  }

}
