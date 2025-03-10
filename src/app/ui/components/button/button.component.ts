import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-button',
  templateUrl: './button.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
})
export class ButtonComponent implements AfterViewInit {
  #platformId = inject(PLATFORM_ID);
  #router = inject(Router);

  label = input.required<string>();
  icon = input.required<string>();
  eventUrl = input<string>();
  disabled = input<boolean>();

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      document
        ?.getElementById(this.icon())
        ?.addEventListener('click', () => window.open(this.eventUrl(), '_self'));
    }
  }

  #shareEvent = (): void => {
    if (this.disabled() || !isPlatformBrowser(this.#platformId)) {
      return;
    }

    const url = this.eventUrl()
    if (url) {
      this.#router.navigateByUrl(url);
    } else {
      const winUri = window.location.href.split('/');
      winUri.pop();
      this.#router.navigateByUrl(winUri.join('/'));
    }
  };
}
