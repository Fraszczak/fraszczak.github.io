import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../services/config';
import PostAttributes from '../../../models/post-attributes';

@Component({
  selector: 'blog-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  @Input({ required: true }) public post!: PostAttributes;
  @HostBinding('class') hostClass = 'flex flex-1';

  #service = inject(ConfigService);

  get getAuthor() {
    return this.#service.getAuthor(this.post.author);
  }
}
