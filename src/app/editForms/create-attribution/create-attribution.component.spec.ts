import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributionComponent } from './create-attribution.component';

describe('CreateAttributionComponent', () => {
  let component: CreateAttributionComponent;
  let fixture: ComponentFixture<CreateAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAttributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
