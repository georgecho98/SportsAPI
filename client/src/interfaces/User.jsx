import type { Book } from './Book';

export class User {
  constructor(username, email, password, savedBooks) {
    this.username = username || null;
    this.email = email || null;
    this.password = password || null;
    this.savedBooks = savedBooks || [];
  }
}