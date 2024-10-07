import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesNotificationsComponent } from './alertes-notifications.component';

describe('AlertesNotificationsComponent', () => {
  let component: AlertesNotificationsComponent;
  let fixture: ComponentFixture<AlertesNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertesNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
