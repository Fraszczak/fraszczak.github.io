import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './patterns/header/header.component';
import { FooterComponent } from './ui/components/footer/footer.component';

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
}
