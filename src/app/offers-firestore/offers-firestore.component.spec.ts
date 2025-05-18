import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersFirestoreComponent } from './offers-firestore.component';

describe('OffersFirestoreComponent', () => {
  let component: OffersFirestoreComponent;
  let fixture: ComponentFixture<OffersFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersFirestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
