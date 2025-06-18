import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button class="theme-toggle" (click)="theme.toggle()" [attr.aria-label]="label">
      <div class="track">
        <mat-icon class="thumb-icon" [class.dark]="theme.isDark()">
          {{ theme.isDark() ? 'dark_mode' : 'light_mode' }}
        </mat-icon>
      </div>
    </button>
  `,
  styles: [`
    .theme-toggle {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      width: 48px;
      height: 26px;
    }

    .track {
      width: 100%;
      height: 100%;

      background-color: var(--md-sys-color-surface-container-highest);
      box-shadow: 0 0 0 1px var(--md-sys-color-outline-variant);
      border-radius: 100%;
      position: relative;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .thumb-icon {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: var(--md-sys-color-on-primary);
      background-color: var(--md-sys-color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .thumb-icon.dark {
      transform: translateX(22px);
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public theme: ThemeService) { }

  get label() {
    return this.theme.isDark() ? 'Basculer en thème clair' : 'Basculer en thème sombre';
  }
}
