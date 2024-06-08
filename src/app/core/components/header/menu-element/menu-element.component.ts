import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-element',
  templateUrl: './menu-element.component.html',
  standalone: true,
})
export class MenuElementComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) href!: string;
}
