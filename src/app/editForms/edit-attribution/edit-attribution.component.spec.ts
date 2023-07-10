import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributionComponent } from './edit-attribution.component';

describe('EditAttributionComponent', () => {
  let component: EditAttributionComponent;
  let fixture: ComponentFixture<EditAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
