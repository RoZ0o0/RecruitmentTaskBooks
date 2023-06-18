package recruitment.task.books.service;

import org.springframework.http.HttpStatus;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    List<BookResponse> getAll();
    List<BookResponse> getAllPaginated(int page, int size);
    BookResponse getBookById(Long id);
    BookResponse createBook(BookRequest bookRequest);
    BookResponse editBook(Long id, BookRequest bookRequest);
    HttpStatus deleteBook(Long id);
}
