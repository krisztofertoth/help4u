import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatAnchor, MatButton} from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // EZ KELL az imports-hoz

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbar, FormsModule, CommonModule, MatButton, MatAnchor, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', ]
})
export class AppComponent {
  title = 'help4u';

  mobileMenuOpen = false;

  user: any = null;
  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.userChanges().subscribe(u => this.user = u);
  }
  openLogin() {
    this.dialog.open(LoginDialogComponent, { width: '370px' });
  }
  logout() {
    this.auth.logout().subscribe();
    this.router.navigate(['/articles']);
  }
}
