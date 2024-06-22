import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { Authors } from '../../models';
import { blogConfig } from '../../../../assets/config';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct author', () => {
    const authorKey: keyof Authors = 'pf'; // You can change the author key as per your configuration
    const expectedAuthor = blogConfig.authors[authorKey];
    const author = service.getAuthor(authorKey);
    expect(author).toEqual(expectedAuthor);
  });

  it('should return undefined for non-existing author', () => {
    const nonExistingAuthorKey: keyof Authors =
      'NonExistingAuthor' as keyof Authors;
    const author = service.getAuthor(nonExistingAuthorKey as keyof Authors);
    expect(author).toBeUndefined();
  });
});
