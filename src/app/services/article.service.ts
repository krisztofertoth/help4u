import { Injectable } from '@angular/core';
import { collection, collectionData, addDoc, doc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type Article = { id?: string; title: string; content: string };

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly colRef;
  constructor(private firestore: Firestore) {
    this.colRef = collection(this.firestore, 'articles');
  }

  getArticles(): Observable<Article[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<Article[]>;
  }

  addArticle(article: Omit<Article, 'id'>) {
    return addDoc(this.colRef, article);
  }

  updateArticle(id: string, data: Partial<Article>) {
    return updateDoc(doc(this.colRef, id), data);
  }

  deleteArticle(id: string) {
    return deleteDoc(doc(this.colRef, id));
  }
}
