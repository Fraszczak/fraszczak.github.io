import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
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
  tags = input<string[]>();
  author = input.required<Author>();

  getAuthorSocialMediaKeys = computed(
    () => Object.keys(this.author().socialMedia) as (keyof SocialMedia)[]
  );
}
