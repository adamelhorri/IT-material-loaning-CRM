import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePurchasesComponent } from './page-purchases.component';

describe('PagePurchasesComponent', () => {
  let component: PagePurchasesComponent;
  let fixture: ComponentFixture<PagePurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePurchasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
