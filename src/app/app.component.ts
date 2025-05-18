import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbar],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', ]
})
export class AppComponent {
  title = 'help4u';
}
