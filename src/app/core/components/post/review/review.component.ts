import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  inject,
  input,
} from '@angular/core';
import PostAttributes from '../../../models/post-attributes';
import { SharePostComponent } from './share-post/share-post.component';
import { ConfigService } from '../../../services/config';
import { ButtonComponent } from '../../button';
import { TagComponent } from '../../tag';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

@Component({
  selector: 'blog-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [
    CommonModule,
    MarkdownComponent,
    SharePostComponent,
    ButtonComponent,
    TagComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  #service = inject(ConfigService);

  post = input.required<ContentFile<PostAttributes | Record<string, never>>>();

  getAuthor = computed(() =>
    this.#service.getAuthor(this.post().attributes.author)
  );
  socialMediaAvailable = computed(
    () => Object.keys(this.getAuthor().socialMedia).length > 0
  );
}
