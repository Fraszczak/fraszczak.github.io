import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-toggle-menu',
  templateUrl: './toggle-menu.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToggleMenuComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMenuToggle(e: any) {
    const navlinks = document.querySelector('.navLinks');
    e.name = e.name === 'menu' ? 'close' : 'menu';
    navlinks?.classList.toggle('left-[0%]');
  }
}
