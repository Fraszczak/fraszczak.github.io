import { Component } from '@angular/core';
import { injectContent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import PostAttributes from '../../patterns/post/models/post-attributes';
import { ReviewComponent } from '../../patterns/post/review/review.component';

@Component({
  selector: 'app-course-detail',
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
export default class CourseComponent {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'courses',
  });
}
