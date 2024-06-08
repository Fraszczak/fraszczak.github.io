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
      <h2 class="text-center mt-10">
        By day, I tackle challenges and craft solutions for a prominent Nordic
        banking institution, using my expertise to make their digital experience
        top-notch. By night (well, maybe more like evenings and weekends!), I
        turn my attention to this blog.
      </h2>
      <h2 class="text-center mt-4">
        Here, you'll find me sharing my knowledge and experiences in the
        ever-evolving world of web development. Whether you're a seasoned
        developer or just starting out, I'm here to help you navigate the
        exciting world of code. I believe in clear explanations, practical
        examples, and the power of a supportive community. So, feel free to dive
        into the blog posts, ask questions in the comments, and let's learn and
        grow together!
      </h2>
    </section>
  `,
  host: {
    class: 'flex justify-center',
  },
})
export class SelfDescriptionComponent {}
