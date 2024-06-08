import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { ButtonComponent } from '../../../button';
import { TagComponent } from '../../../tag';
import { Author, SocialMedia } from '../../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-share-post',
  templateUrl: './share-post.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, ButtonComponent, TagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharePostComponent {
  @Input() tags!: string[];
  @Input({ required: true }) author!: Author;

  get getAuthorSocialMediaKeys() {
    return Object.keys(this.author.socialMedia) as (keyof SocialMedia)[];
  }
}
