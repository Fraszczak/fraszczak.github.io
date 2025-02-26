import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ButtonComponent } from '../../../ui/components/button/button.component';
import { SharePostComponent } from './share-post/share-post.component';
import { TagComponent } from '../../../ui/components/tag/tag.component';
import { ConfigService } from '../../../core/services/config/config.service';
import { WindowWidthService } from '../../../core/services/window-width/window-width.service';
import PostAttributes from '../models/post-attributes';

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
  #configService = inject(ConfigService);
  #widthService = inject(WindowWidthService);

  post = input.required<ContentFile<PostAttributes | Record<string, never>>>();

  isMobile = computed(() => this.#widthService.isMobile());

  getAuthor = computed(() =>
    this.#configService.getAuthor(this.post().attributes.author)
  );

  socialMediaAvailable = computed(
    () => Object.keys(this.getAuthor().socialMedia).length > 0
  );

  windowUrl = computed(() => {
    const winUri = window.location.href.split('/');
    winUri.pop();
    return `${winUri.join('/')}/`;
  });
}
