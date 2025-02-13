import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecopassComponent } from './recopass.component';

describe('RecopassComponent', () => {
  let component: RecopassComponent;
  let fixture: ComponentFixture<RecopassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecopassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecopassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
