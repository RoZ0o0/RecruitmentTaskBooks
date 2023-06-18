package recruitment.task.books.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;
import recruitment.task.books.entity.Book;
import recruitment.task.books.mapper.BookMapper;
import recruitment.task.books.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceimpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public BookServiceimpl(BookRepository bookRepository, BookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }

    @Override
    public List<BookResponse> getAll() {
        List<Book> entities = bookRepository.findAll();

        return bookMapper.mapToList(entities);
    }

    @Override
    public List<BookResponse> getAllPaginated(int page, int size) {
        Pageable getPage = PageRequest.of(page, size);
        Page<Book> entities = bookRepository.findAll(getPage);

        return bookMapper.mapToListPage(entities);
    }

    @Override
    public BookResponse getBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (!optionalBook.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return bookMapper.entityToResponse(optionalBook.get());
    }

    @Override
    public BookResponse createBook(BookRequest bookRequest) {
        Book book = bookMapper.mapToEntity(bookRequest);
        if (book.getGenre() == null) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        bookRepository.save(book);

        return bookMapper.entityToResponse(book);
    }

    @Override
    public BookResponse editBook(Long id, BookRequest bookRequest) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        Book entity;
        entity = optionalBook.get();

        bookMapper.mapToEntity(entity, bookRequest);
        bookRepository.save(entity);

        return bookMapper.entityToResponse(entity);
    }

    @Override
    public HttpStatus deleteBook(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        Book entity;
        entity = optionalBook.get();

        bookRepository.delete(entity);

        return HttpStatus.OK;
    }
}
