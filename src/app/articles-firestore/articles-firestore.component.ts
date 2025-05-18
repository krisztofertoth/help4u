import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article, ArticleService } from '../services/article.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-articles-firestore',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './articles-firestore.component.html',
  styleUrls: ['./articles-firestore.component.scss']
})
export class ArticlesFirestoreComponent {
  private svc = inject(ArticleService);
  private dialog = inject(MatDialog);

  articles$: Observable<Article[]> = this.svc.getArticles();
  form: Omit<Article, 'id'> = { title: '', content: '' };
  editing: Article | null = null;

  @ViewChild('formDialog') formDialog!: TemplateRef<any>;
  dialogRef: MatDialogRef<any> | null = null;

  openForm(article: Article | null = null) {
    this.editing = article;
    if (article) {
      this.form = { title: article.title, content: article.content };
    } else {
      this.form = { title: '', content: '' };
    }
    this.dialogRef = this.dialog.open(this.formDialog, { width: '420px' });
  }
  closeDialog() {
    this.dialogRef?.close();
  }

  save() {
    if (this.editing) {
      this.svc.updateArticle(this.editing.id!, this.form).then(() => this.closeDialog());
    } else {
      this.svc.addArticle(this.form).then(() => this.closeDialog());
    }
  }
  delete(article: Article) {
    if (confirm('Biztos törlöd?')) {
      this.svc.deleteArticle(article.id!);
      if (this.editing?.id === article.id) this.closeDialog();
    }
  }
}
