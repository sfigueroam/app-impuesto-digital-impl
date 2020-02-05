import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarTransaccionComponent } from './procesar-transaccion.component';

describe('ProcesarTransaccionComponent', () => {
  let component: ProcesarTransaccionComponent;
  let fixture: ComponentFixture<ProcesarTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
