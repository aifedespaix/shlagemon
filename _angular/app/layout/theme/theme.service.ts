import { Injectable, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { isDarkTheme } from './theme.signal';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = stored ? stored === 'dark' : prefersDark;
      isDarkTheme.set(dark);

      effect(() => {
        const classList = document.documentElement.classList;
        classList.toggle('dark-theme', isDarkTheme());
        classList.toggle('light-theme', !isDarkTheme());
        localStorage.setItem('theme', isDarkTheme() ? 'dark' : 'light');
      });
    }
  }

  toggle() {
    isDarkTheme.update(v => !v);
  }

  isDark = isDarkTheme;
}
