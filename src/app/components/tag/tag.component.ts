import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input({ required: true }) tag!: string;
}
