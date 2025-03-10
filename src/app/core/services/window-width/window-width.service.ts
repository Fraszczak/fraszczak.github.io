import { Injectable, computed, signal } from '@angular/core';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WindowWidthService {
  private platformId = inject(PLATFORM_ID);
  private width = signal(this.getInitialWidth());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', () => {
        this.width.set(window.innerWidth);
      });
    }
  }

  private getInitialWidth(): number {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth;
    }
    // Default width for server-side rendering
    return 1024; // Assuming a desktop view by default
  }

  get isMobile() {
    return computed(() => this.width() <= 768);
  }
}
