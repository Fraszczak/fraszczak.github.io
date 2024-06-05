import { Injectable } from '@angular/core';
import { Author, Authors } from '../../models';
import { blogConfig } from '../../../assets/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  #blogConfig = blogConfig;

  getAuthor(author: keyof Authors): Author {
    return this.#blogConfig.authors[author];
  }
}
