import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Offer, OffersService } from '../services/offers.service';
import { Job, JobsService } from '../services/jobs.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-offers-firestore',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatListModule, MatChipsModule, MatSelectModule, MatIconModule, MatDialogModule
  ],
  templateUrl: './offers-firestore.component.html',
  styleUrls: ['./offers-firestore.component.scss']
})
export class OffersFirestoreComponent {
  private offerSvc = inject(OffersService);
  private jobSvc = inject(JobsService);
  private dialog = inject(MatDialog);

  offers$: Observable<Offer[]> = this.offerSvc.getOffers();
  jobs$: Observable<Job[]> = this.jobSvc.getJobs();

  form: Omit<Offer, 'id'> = { jobId: '', price: null as any, message: '', status: 'PENDING' };
  editing: Offer | null = null;

  jobsList: Job[] = [];
  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  dialogRef: MatDialogRef<any> | null = null;

  constructor() {
    this.jobs$.subscribe(jobs => this.jobsList = jobs);
  }
  getJobTitle(jobId: string): string {
    return this.jobsList.find(j => j.id === jobId)?.title || 'N/A';
  }

  openForm(offer: Offer | null = null) {
    this.editing = offer;
    if (offer) {
      this.form = { jobId: offer.jobId, price: offer.price, message: offer.message, status: offer.status };
    } else {
      this.form = { jobId: '', price: null as any, message: '', status: 'PENDING' };
    }
    this.dialogRef = this.dialog.open(this.formDialog, { width: '400px' });
  }
  closeDialog() {
    this.dialogRef?.close();
  }

  save() {
    if (this.editing) {
      this.offerSvc.updateOffer(this.editing.id!, this.form).then(() => this.closeDialog());
    } else {
      this.offerSvc.addOffer(this.form).then(() => this.closeDialog());
    }
  }
  delete(offer: Offer) {
    if (confirm('Biztos törlöd?')) {
      this.offerSvc.deleteOffer(offer.id!);
      if (this.editing?.id === offer.id) this.closeDialog();
    }
  }
}
