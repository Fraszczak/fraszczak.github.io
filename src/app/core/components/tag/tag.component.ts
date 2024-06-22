import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'blog-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
})
export class TagComponent {
  tag = input.required<string>();
}
