import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author, SocialMedia } from '../../../../core/models';
import { ButtonComponent } from '../../../../ui/components/button/button.component';
import { TagComponent } from '../../../../ui/components/tag/tag.component';

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
