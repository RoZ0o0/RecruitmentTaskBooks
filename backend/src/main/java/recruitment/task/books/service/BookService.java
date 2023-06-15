package recruitment.task.books.service;

import recruitment.task.books.dto.BookDTO;

public interface BookService {
    BookDTO getBookById(Long id);
}
