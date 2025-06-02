import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    NavbarComponent,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PFQuispe';
}
