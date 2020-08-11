import { Book } from '../models/book.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {
    transform(books: Book[], searchTerm: string) {
        if (!books || !searchTerm) {
            return books;
        }
        return books.filter(book => book.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
