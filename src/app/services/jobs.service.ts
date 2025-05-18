import { Injectable } from '@angular/core';
import { collection, collectionData, addDoc, doc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type Job = { id?: string; title: string; description: string; price: number; deadline: string };

@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly colRef;
  constructor(private firestore: Firestore) {
    this.colRef = collection(this.firestore, 'jobs');
  }

  getJobs(): Observable<Job[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<Job[]>;
  }

  addJob(job: Omit<Job, 'id'>) {
    return addDoc(this.colRef, job);
  }

  updateJob(id: string, data: Partial<Job>) {
    return updateDoc(doc(this.colRef, id), data);
  }

  deleteJob(id: string) {
    return deleteDoc(doc(this.colRef, id));
  }
}
