import { TestBed } from '@angular/core/testing';
import { WindowWidthService } from './window-width.service';

describe('WindowWidthService', () => {
  let service: WindowWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial width set to window innerWidth', () => {
    expect(service['width']()).toBe(window.innerWidth);
  });

  it('should update width on window resize', () => {
    const newWidth = 500;
    window.innerWidth = newWidth;
    window.dispatchEvent(new Event('resize'));

    expect(service['width']()).toBe(newWidth);
  });

  it('should correctly identify mobile width', () => {
    // Mock a mobile width
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    expect(service.isMobile()).toBeFalsy();

    // Mock a non-mobile width
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));

    expect(service.isMobile()).toBeFalsy();
  });
});
