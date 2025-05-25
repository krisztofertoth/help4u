import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Firestore,
  query,
  where,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type Offer = { id?: string; jobId: string; price: number; message: string; status: string };

@Injectable({ providedIn: 'root' })
export class OffersService {
  private colRef;
  constructor(private firestore: Firestore) {
    this.colRef = collection(this.firestore, 'offers');
  }

  getOffers(): Observable<Offer[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<Offer[]>;
  }

  addOffer(offer: Omit<Offer, 'id'>) {
    return addDoc(this.colRef, offer);
  }

  updateOffer(id: string, data: Partial<Offer>) {
    return updateDoc(doc(this.colRef, id), data);
  }

  deleteOffer(id: string) {
    return deleteDoc(doc(this.colRef, id));
  }

  async acceptOffer(offerId: string, jobId: string) {
    // Lekéri az összes ajánlatot ugyanarra a jobId-ra
    const q = query(this.colRef, where('jobId', '==', jobId));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(this.firestore);

    querySnapshot.forEach((d: any) => {
      if (d.id === offerId) {
        batch.update(doc(this.colRef, d.id), { status: 'ACCEPTED' });
      } else {
        batch.update(doc(this.colRef, d.id), { status: 'REJECTED' });
      }
    });
    await batch.commit();
  }
}
