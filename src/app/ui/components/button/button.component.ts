import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'blog-button',
  templateUrl: './button.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
})
export class ButtonComponent implements AfterViewInit {
  #platformId = inject(PLATFORM_ID);

  label = input.required<string>();
  icon = input.required<string>();
  eventUrl = input<string>();
  disabled = input<boolean>();

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      document
        ?.getElementById(this.icon())
        ?.addEventListener('click', this.#shareEvent);
    }
  }

  #shareEvent = (): void => {
    if (this.disabled()) {
      return;
    }
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }
    if (this.eventUrl()) {
      console.log('eventUrl', this.eventUrl());
      window.open(this.eventUrl(), '_self');
    } else {
      console.log('window.location.href', window.location.href);
      const winUri = window.location.href.split('/');
      winUri.pop();
      window.open(winUri.join('/'), '_self');
    }
  };
}
