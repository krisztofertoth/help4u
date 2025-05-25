import { Routes } from '@angular/router';
import {ArticlesFirestoreComponent} from './articles-firestore/articles-firestore.component';
import {OffersFirestoreComponent} from './offers-firestore/offers-firestore.component';
import {JobsFirestoreComponent} from './jobs-firestore/jobs-firestore.component';
import {AboutComponent} from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch:'full'},
  { path: 'articles', component: ArticlesFirestoreComponent},
  { path: 'jobs', component: JobsFirestoreComponent },
  { path: 'offers', component: OffersFirestoreComponent },
  { path: 'about', component: AboutComponent }
];
