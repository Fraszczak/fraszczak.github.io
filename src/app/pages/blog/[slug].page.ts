import { Component } from '@angular/core';
import { injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { ReviewComponent } from '../../core/components/post';
import PostAttributes from '../../core/models/post-attributes';

@Component({
  standalone: true,
  imports: [AsyncPipe, ReviewComponent],
  template: `
    @if (post$ | async; as post) {
    <article>
      <blog-review [post]="post" />
    </article>
    }
  `,
})
export default class BlogPostsComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
