import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDatosComponent } from './tabla-datos.component';

describe('TablaDatosComponent', () => {
  let component: TablaDatosComponent;
  let fixture: ComponentFixture<TablaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
