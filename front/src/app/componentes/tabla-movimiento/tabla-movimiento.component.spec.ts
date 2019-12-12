import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMovimientoComponent } from './tabla-movimiento.component';

describe('TablaMovimientoComponent', () => {
  let component: TablaMovimientoComponent;
  let fixture: ComponentFixture<TablaMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
