import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorModalComponent } from './autor-modal.component';

describe('AutorModalComponent', () => {
  let component: AutorModalComponent;
  let fixture: ComponentFixture<AutorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
