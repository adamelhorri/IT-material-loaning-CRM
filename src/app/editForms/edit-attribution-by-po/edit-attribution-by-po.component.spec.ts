import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributionByPoComponent } from './edit-attribution-by-po.component';

describe('EditAttributionByPoComponent', () => {
  let component: EditAttributionByPoComponent;
  let fixture: ComponentFixture<EditAttributionByPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttributionByPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttributionByPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
