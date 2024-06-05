import { Component, HostBinding } from '@angular/core';
import { SelfIntroductionComponent } from '../self-introduction';
import { AvatarComponent } from '../avatar';
import { SelfDescriptionComponent } from '../self-description';

@Component({
  selector: 'app-hello-component',
  standalone: true,
  template: `
    <app-self-introduction />
    <app-avatar />
    <app-self-description />
  `,
  host: {
    class: 'block h-full',
  },
  imports: [
    SelfIntroductionComponent,
    AvatarComponent,
    SelfDescriptionComponent,
  ],
})
export class HelloComponent {
  @HostBinding('class') hostClass = 'flex flex-col w-full h-full';
}
