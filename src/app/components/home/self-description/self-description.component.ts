import { Component } from '@angular/core';

@Component({
  selector: 'app-self-description',
  standalone: true,
  imports: [],
  template: `
    <section class="max-w-screen-xl w-full text-black dark:text-white">
      <h1 class="text-center text-2xl mt-10 mb-10 font-bold">
        Hi there! I'm Piotr, nice to meet you
      </h1>
      <h2 class="text-center  mt-10 mb-10">
        I am a dedicated software engineer specializing in web development,
        currently employed within a prominent Nordic banking institution. My
        primary focus lies in crafting innovative solutions for our esteemed
        clientele through the utilization of Angular. Possessing a profound
        comprehension of software engineering principles and methodologies, I am
        unwaveringly committed to ongoing skill enhancement and the assimilation
        of emerging technologies.
      </h2>
    </section>
  `,
  host: {
    class: 'flex justify-center',
  },
})
export class SelfDescriptionComponent {}
