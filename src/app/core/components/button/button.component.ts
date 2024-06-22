import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  input,
} from '@angular/core';
import { Author, SocialMedia } from '../../models';

@Component({
  selector: 'blog-button',
  templateUrl: './button.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
})
export class ButtonComponent implements AfterViewInit {
  label = input.required<string>();
  icon = input.required<keyof SocialMedia>();
  author = input.required<Author>();

  ngAfterViewInit(): void {
    document
      ?.getElementById(this.icon())
      ?.addEventListener('click', this.#shareEvent);
  }

  #shareEvent = (): void => {
    if (this.author().socialMedia[this.icon()]) {
      const navUrl =
        this.author().socialMedia[this.icon()] + window.location.href;
      window.open(navUrl, '_blank');
    } else {
      window.history.back();
    }
  };
}
