import { Component, input } from '@angular/core';
import { PreviewComponent } from '../../patterns/post/preview/preview.component';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from 'src/app/patterns/post/models/post-attributes';

interface CourseAttributes {
  title: string;
  description: string;
  slug: string;
}

@Component({
  selector: 'app-courses-index',
  standalone: true,
  imports: [PreviewComponent],
  template: `
    <h1
      class="p-4 text-center text-black dark:text-white text-xl font-bold tracking-[.25em]"
    >
      Courses Archive
    </h1>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
      @for (course of courses; track course.attributes.slug) {
      <blog-preview [post]="course.attributes" [routeType]="'courses'" />
      }
    </section>
  `,
})
export default class CoursesComponent {
    readonly courses = injectContentFiles<PostAttributes>()
    .filter((course) => course.filename.startsWith('/src/content/courses/'))
    .sort((a, b) => {
      return new Date(b.attributes.publishDate).getTime() - new Date(a.attributes.publishDate).getTime();
    });
}
