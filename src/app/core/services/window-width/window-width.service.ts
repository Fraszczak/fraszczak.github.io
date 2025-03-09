import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowWidthService {
  private width = signal(window?.innerWidth);

  constructor() {
    window?.addEventListener('resize', () => {
      this.width.set(window?.innerWidth);
    });
  }

  get isMobile() {
    return computed(() => this.width() <= 768);
  }
}
