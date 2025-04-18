import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMuralComponent } from './pagina-mural.component';

describe('PaginaMuralComponent', () => {
  let component: PaginaMuralComponent;
  let fixture: ComponentFixture<PaginaMuralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaMuralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaMuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
