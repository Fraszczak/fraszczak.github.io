import { Component } from '@angular/core';

@Component({
  selector: 'app-self-introduction',
  standalone: true,
  imports: [],
  template: `
    <h1
      class="p-4 text-4xl text-center text-black dark:text-white ptext-xl font-bold tracking-[.25em]"
    >
      Software Engineer
    </h1>
    <h2 class="mb-10 text-center text-base text-black dark:text-white italic">
      I belive that every problem has a solution - it just needs the right code
    </h2>
  `,
})
export class SelfIntroductionComponent {}
