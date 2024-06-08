import { Component } from '@angular/core';
import { HelloComponent } from './../core/components/home/hello';
@Component({
  standalone: true,
  imports: [HelloComponent],
  template: `<app-hello-component />`,
  host: {
    class: 'block',
  },
})
export default class HomePageComponent {}
