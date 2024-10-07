import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertusAlimentsComponent } from './vertus-aliments.component';

describe('VertusAlimentsComponent', () => {
  let component: VertusAlimentsComponent;
  let fixture: ComponentFixture<VertusAlimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VertusAlimentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertusAlimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
