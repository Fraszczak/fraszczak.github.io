import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
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
  @Input({ required: true }) label!: string;
  @Input({ required: true }) icon!: keyof SocialMedia;
  @Input({ required: true }) author!: Author;

  ngAfterViewInit(): void {
    document?.getElementById(this.icon)?.addEventListener('click', this.#share);
  }

  #share = (): void => {
    if (this.author.socialMedia[this.icon]) {
      const navUrl = this.author.socialMedia[this.icon] + window.location.href;
      window.open(navUrl, '_blank');
    } else {
      window.history.back();
    }
  };
}
