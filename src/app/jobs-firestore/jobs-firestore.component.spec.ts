import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsFirestoreComponent } from './jobs-firestore.component';

describe('JobsFirestoreComponent', () => {
  let component: JobsFirestoreComponent;
  let fixture: ComponentFixture<JobsFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsFirestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
