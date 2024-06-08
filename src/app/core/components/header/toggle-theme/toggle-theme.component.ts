import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  standalone: true,
})
export class ToggleThemeComponent {
  onThemeToggle() {
    document.documentElement.classList.toggle('dark');
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }
}
