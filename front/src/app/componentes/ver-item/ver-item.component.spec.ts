import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerItemComponent } from './ver-item.component';

describe('VerItemComponent', () => {
  let component: VerItemComponent;
  let fixture: ComponentFixture<VerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
