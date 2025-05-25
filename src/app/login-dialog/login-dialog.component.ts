import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // EZ HIÁNYZIK!
import { MatButtonModule } from '@angular/material/button'; // NEM MatButton!

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormField,
    MatButton,
    MatLabel,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    // material modulok amik kellenek
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  isSignUp = false;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.error = '';
  }

  submit() {
    this.loading = true;
    const obs = this.isSignUp
      ? this.auth.signUp(this.email, this.password)
      : this.auth.signIn(this.email, this.password);

    obs.subscribe({
      next: () => this.dialogRef.close(),
      error: err => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
