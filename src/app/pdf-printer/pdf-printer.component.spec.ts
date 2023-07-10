import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPrinterComponent } from './pdf-printer.component';

describe('PdfPrinterComponent', () => {
  let component: PdfPrinterComponent;
  let fixture: ComponentFixture<PdfPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPrinterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
