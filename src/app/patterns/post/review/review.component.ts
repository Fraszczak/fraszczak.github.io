import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  input,
  AfterViewChecked,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '../../../ui/components/button/button.component';
import { SharePostComponent } from './share-post/share-post.component';
import { TagComponent } from '../../../ui/components/tag/tag.component';
import { ConfigService } from '../../../core/services/config/config.service';
import { WindowWidthService } from '../../../core/services/window-width/window-width.service';
import PostAttributes from '../models/post-attributes';

@Component({
  selector: 'blog-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [
    CommonModule,
    MarkdownComponent,
    SharePostComponent,
    ButtonComponent,
    TagComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: '' },
  encapsulation: ViewEncapsulation.None,
})
export class ReviewComponent implements AfterViewChecked {
  #configService = inject(ConfigService);
  #widthService = inject(WindowWidthService);
  #platformId = inject(PLATFORM_ID);

  post = input.required<ContentFile<PostAttributes | Record<string, never>>>();

  isMobile = computed(() => this.#widthService.isMobile());
  getAuthor = computed(() =>
    this.#configService.getAuthor(this.post().attributes.author)
  );
  socialMediaAvailable = computed(
    () => Object.keys(this.getAuthor().socialMedia).length > 0
  );
  windowUrl = computed(() => {
    if (isPlatformBrowser(this.#platformId)) {
      const winUri = window.location.href.split('/');
      winUri.pop();
      return `${winUri.join('/')}/`;
    }
    // Default value for server-side rendering
    return '/';
  });

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.#platformId)) {
      this.setupCodeBlockCopyButtons();
    }
  }

  private setupCodeBlockCopyButtons() {
    const preElements = document.querySelectorAll('.analog-markdown pre');

    preElements.forEach((preElement) => {
      // Skip if already processed
      if (preElement.classList.contains('code-block-processed')) return;

      // Mark as processed
      preElement.classList.add('code-block-processed');

      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `;
      copyButton.title = 'Copy to clipboard';

      // Add click event listener
      copyButton.addEventListener('click', () => {
        const codeElement = preElement.querySelector('code');
        if (!codeElement) return;

        const codeText = codeElement.textContent || '';
        navigator.clipboard.writeText(codeText).then(() => {
          // Show copied state
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `;
          copyButton.title = 'Copied!';

          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            `;
            copyButton.title = 'Copy to clipboard';
          }, 2000);
        });
      });

      // Append to pre element
      preElement.appendChild(copyButton);
    });
  }
}
