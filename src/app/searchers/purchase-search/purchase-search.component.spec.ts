import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSearchComponent } from './purchase-search.component';

describe('PurchaseSearchComponent', () => {
  let component: PurchaseSearchComponent;
  let fixture: ComponentFixture<PurchaseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
