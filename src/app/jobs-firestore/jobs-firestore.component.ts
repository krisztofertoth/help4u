import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import { Job, JobsService } from '../services/jobs.service';
import { Offer, OffersService } from '../services/offers.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-jobs-firestore',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './jobs-firestore.component.html',
  styleUrls: ['./jobs-firestore.component.scss']
})
export class JobsFirestoreComponent {
  private jobsSvc = inject(JobsService);
  private offersSvc = inject(OffersService);
  private dialog = inject(MatDialog);

  jobs$: Observable<Job[]> = this.jobsSvc.getJobs();
  offers$: Observable<Offer[]> = this.offersSvc.getOffers();

  // --- JAVÍTOTT PIPE ---
  jobsWithOffers$: Observable<(Job & { offers: Offer[] })[]> = combineLatest([
    this.jobs$,
    this.offers$
  ]).pipe(
    map(([jobs, offers]) =>
      jobs.map(job => ({
        id: job.id,
        title: typeof job.title === 'string' && job.title.trim() !== '' ? job.title : '–',
        price: typeof job.price === 'number' ? job.price : 0,
        description: typeof job.description === 'string' ? job.description : '',
        deadline: typeof job.deadline === 'string' && job.deadline.trim() !== '' ? job.deadline : '',
        offers: offers.filter(o => o.jobId === job.id)
      }))
    )
  );

  form: Omit<Job, 'id'> = { title: '', description: '', price: null as any, deadline: '' };
  editing: Job | null = null;

  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  dialogRef: MatDialogRef<any> | null = null;

  openForm(job: Job | null = null) {
    this.editing = job;
    if (job) {
      this.form = { title: job.title, description: job.description, price: job.price, deadline: job.deadline };
    } else {
      this.form = { title: '', description: '', price: null as any, deadline: '' };
    }
    this.dialogRef = this.dialog.open(this.formDialog, { width: '450px' });
  }

  closeDialog() {
    this.dialogRef?.close();
  }

  save() {
    if (this.editing) {
      this.jobsSvc.updateJob(this.editing.id!, this.form).then(() => this.closeDialog());
    } else {
      this.jobsSvc.addJob(this.form).then(() => this.closeDialog());
    }
  }
  delete(job: Job) {
    if (confirm('Biztos törlöd?')) {
      this.jobsSvc.deleteJob(job.id!);
      if (this.editing?.id === job.id) this.closeDialog();
    }
  }
}
