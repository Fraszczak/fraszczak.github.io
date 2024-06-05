import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-center items-center">
      <img
        src="assets/images/home/avatar.png"
        alt="Avatar"
        class="h-64 object-cover rounded-lg"
      />
    </div>
  `,
})
export class AvatarComponent {}
