import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    ThemeToggleComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  constructor() { }
}
