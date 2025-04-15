import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaUsuarioComponent } from './verifica-usuario.component';

describe('VerificaUsuarioComponent', () => {
  let component: VerificaUsuarioComponent;
  let fixture: ComponentFixture<VerificaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
