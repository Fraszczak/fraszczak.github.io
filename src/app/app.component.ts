import { Component, HostBinding, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header class="w-full mx-auto max-w-screen-xl" />
    <div class="flex-1 px-4 sm:px-8 mt-9">
      <div class="mx-auto max-w-screen-lg lg:px-8">
        <router-outlet />
      </div>
    </div>
    <app-footer class="w-full mx-auto max-w-screen-xl" />
  `,
})
export class AppComponent {
  @HostBinding('class') hostClass = 'flex flex-col w-full h-full';

  #router = inject(Router);

  constructor() {
    let path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.#router.navigate([path]);
    }
  }
}
