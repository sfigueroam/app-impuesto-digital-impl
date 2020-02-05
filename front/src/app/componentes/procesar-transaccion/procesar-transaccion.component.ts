import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-procesar-transaccion',
  templateUrl: './procesar-transaccion.component.html',
  styleUrls: ['./procesar-transaccion.component.scss']
})
export class ProcesarTransaccionComponent implements OnInit {
  @Input() idGiros:[{}];

  constructor() { }

  ngOnInit() {
  }

}
