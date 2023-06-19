package recruitment.task.books.service;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    Page<BookResponse> getAllPaginated(int page, int size, Boolean order, String sort);
    Page<BookResponse> searchBook(int page, int size, Boolean order, String sort, String search);
    BookResponse getBookById(Long id);
    BookResponse createBook(BookRequest bookRequest);
    BookResponse editBook(Long id, BookRequest bookRequest);
    HttpStatus deleteBook(Long id);
}
