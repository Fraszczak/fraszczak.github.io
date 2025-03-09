import { Component } from '@angular/core';
import { injectContent, injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../patterns/post/models/post-attributes';
import { PreviewComponent } from '../../patterns/post/preview/preview.component';

@Component({
  selector: 'app-blog-index',
  standalone: true,
  imports: [PreviewComponent],
  template: `
    <h1
      class="p-4 text-center text-black dark:text-white text-xl font-bold tracking-[.25em]"
    >
      Blog Archive
    </h1>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
      @for (post of posts; track post.attributes.slug) {
      <blog-preview [post]="post.attributes" />
      }
    </section>
  `,
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>()
  .filter((post) => post.filename.startsWith('/src/content/blog/'))
  .sort((a, b) => {
    return new Date(b.attributes.publishDate).getTime() - new Date(a.attributes.publishDate).getTime();
  });
}
