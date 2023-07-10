import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDispoComponent } from './page-dispo.component';

describe('PageDispoComponent', () => {
  let component: PageDispoComponent;
  let fixture: ComponentFixture<PageDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDispoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
