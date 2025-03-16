import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex justify-center items-center">
      <img
        priority
        height="250"
        width="250"
        ngSrc="/images/home/avatar.png"
        alt="Avatar"
        class="h-64 object-cover rounded-lg"
      />
    </div>
  `,
})
export class AvatarComponent {}
