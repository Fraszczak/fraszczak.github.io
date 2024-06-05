import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';
import { ToggleMenuComponent } from './toggle-menu/toggle-menu.component';
import { MenuElementComponent } from './menu-element/menu-element.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleThemeComponent, ToggleMenuComponent, MenuElementComponent],
  templateUrl: './header.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {}
