package recruitment.task.books.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;
import recruitment.task.books.service.BookService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping()
    public List<BookResponse> getAll() { return bookService.getAll(); }

    @GetMapping("/getPage")
    public List<BookResponse> getAllPaginated(@RequestParam int page, @RequestParam int size) { return bookService.getAllPaginated(page, size); }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public BookResponse createBook(@RequestBody BookRequest bookRequest) { return bookService.createBook(bookRequest); }

    @PutMapping("/{id}")
    public BookResponse editBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) { return bookService.editBook(id, bookRequest); }

    @DeleteMapping("/{id}")
    public HttpStatus deleteBook(@PathVariable Long id) { return bookService.deleteBook(id); }
}
