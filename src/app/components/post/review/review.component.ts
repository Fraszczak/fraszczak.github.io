import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import PostAttributes from '../../../models/post-attributes';
import { SharePostComponent } from './share-post/share-post.component';
import { ConfigService } from '../../../services/config';
import { ButtonComponent } from '../../button';
import { TagComponent } from '../../tag';

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
  @Input({ required: true }) post!: ContentFile<
    PostAttributes | Record<string, never>
  >;

  #service = inject(ConfigService);

  get getAuthor() {
    return this.#service.getAuthor(this.post.attributes.author);
  }

  get socialMediaAvailable() {
    return Object.keys(this.getAuthor.socialMedia).length > 0;
  }
}
