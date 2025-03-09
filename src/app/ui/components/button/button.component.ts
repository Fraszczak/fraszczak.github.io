import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
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
  label = input.required<string>();
  icon = input.required<string>();
  eventUrl = input<string>();
  disabled = input<boolean>();

  ngAfterViewInit(): void {
    document
      ?.getElementById(this.icon())
      ?.addEventListener('click', this.#shareEvent);
  }

  #shareEvent = (): void => {
    if (this.disabled()) {
      return;
    }
    if (this.eventUrl()) {
      window.open(this.eventUrl(), '_self');
    } else {
      const winUri = window.location.href.split('/');
      winUri.pop();
      window.open(winUri.join('/'), '_self');
    }
  };
}
