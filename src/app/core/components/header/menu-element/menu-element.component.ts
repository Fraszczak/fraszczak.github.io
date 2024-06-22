import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-menu-element',
  templateUrl: './menu-element.component.html',
  standalone: true,
})
export class MenuElementComponent {
  name = input.required<string>();
  href = input.required<string>();
}
