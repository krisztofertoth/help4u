import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFirestoreComponent } from './articles-firestore.component';

describe('ArticlesFirestoreComponent', () => {
  let component: ArticlesFirestoreComponent;
  let fixture: ComponentFixture<ArticlesFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesFirestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
