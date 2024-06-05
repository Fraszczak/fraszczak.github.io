import { Component } from '@angular/core';
import { HelloComponent } from '../components/home/hello-component';

@Component({
  standalone: true,
  imports: [HelloComponent],
  template: `<app-hello-component />`,
  host: {
    class: 'block',
  },
})
export default class HomePageComponent {}
