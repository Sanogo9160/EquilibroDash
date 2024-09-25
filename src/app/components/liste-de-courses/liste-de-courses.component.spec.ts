import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeCoursesComponent } from './liste-de-courses.component';

describe('ListeDeCoursesComponent', () => {
  let component: ListeDeCoursesComponent;
  let fixture: ComponentFixture<ListeDeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDeCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
