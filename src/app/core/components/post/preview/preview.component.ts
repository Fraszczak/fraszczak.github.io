import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../services/config';
import PostAttributes from '../../../models/post-attributes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'blog-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  post = input<PostAttributes>();
  @HostBinding('class') hostClass = 'flex flex-1';

  #service = inject(ConfigService);
  #sanitizer = inject(DomSanitizer);

  postDescription = computed(() =>
    this.#sanitizer.bypassSecurityTrustHtml(this.post()?.description || '')
  );

  getAuthor = computed(() =>
    this.#service.getAuthor(this.post()?.author || 'pf')
  );
}
