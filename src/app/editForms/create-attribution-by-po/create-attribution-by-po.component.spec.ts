import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributionByPoComponent } from './create-attribution-by-po.component';

describe('CreateAttributionByPoComponent', () => {
  let component: CreateAttributionByPoComponent;
  let fixture: ComponentFixture<CreateAttributionByPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAttributionByPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAttributionByPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
