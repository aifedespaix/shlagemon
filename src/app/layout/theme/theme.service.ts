import { Injectable, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { isDarkTheme } from './theme.signal';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      effect(() => {
        const classList = document.documentElement.classList;
        classList.toggle('dark-theme', isDarkTheme());
        classList.toggle('light-theme', !isDarkTheme());
      });
    }
  }

  toggle() {
    isDarkTheme.update(v => !v);
  }

  isDark = isDarkTheme;
}
