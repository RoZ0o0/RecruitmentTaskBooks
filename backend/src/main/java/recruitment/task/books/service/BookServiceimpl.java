package recruitment.task.books.service;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;
import recruitment.task.books.entity.Book;
import recruitment.task.books.mapper.BookMapper;
import recruitment.task.books.repository.BookRepository;
import recruitment.task.books.validator.BookValidator;

import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

@Service
public class BookServiceimpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final BookValidator bookValidator;

    public BookServiceimpl(BookRepository bookRepository, BookMapper bookMapper, BookValidator bookValidator) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.bookValidator = bookValidator;
    }

    @Override
    public Page<BookResponse> getAllPaginated(int page, int size, Boolean order, String sortBy) {
        Pageable getPage;

        if (!bookValidator.validatePagination(page, size, sortBy)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (order) {
            getPage = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sortBy));
        } else {
            getPage = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        }

        Page<Book> bookPageList = bookRepository.findAll(getPage);

        Page<BookResponse> responseBookPage = bookPageList.map(new Function<Book, BookResponse>() {
            @Override
            public BookResponse apply(Book book) {
                return bookMapper.entityToResponse(book);
            }
        });

        return responseBookPage;
    }

    @Override
    public Page<BookResponse> searchBook(int page, int size, Boolean order, String sortBy, String search) {
        Pageable getPage;
        Page<Book> bookPageList;

        if (!bookValidator.validatePagination(page, size, sortBy)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (order) {
            getPage = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sortBy));
        } else {
            getPage = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        }

        if (Objects.equals(search, "")) {
            bookPageList = bookRepository.findAll(getPage);
        } else {
            Specification<Book> specification = BookRepository.search(search);
            bookPageList = bookRepository.findAll(specification, getPage);
        }

        Page<BookResponse> responseBookPage = bookPageList.map(new Function<Book, BookResponse>() {
            @Override
            public BookResponse apply(Book book) {
                return bookMapper.entityToResponse(book);
            }
        });

        return responseBookPage;
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
        if (!bookValidator.validateBook(bookRequest)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        Book book = bookMapper.mapToEntity(bookRequest);
        bookRepository.save(book);

        return bookMapper.entityToResponse(book);
    }

    @Override
    public BookResponse editBook(Long id, BookRequest bookRequest) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        Book book;

        if (!bookValidator.validateBook(bookRequest)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!optionalBook.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        book = optionalBook.get();

        bookMapper.mapToEntity(book, bookRequest);
        bookRepository.save(book);

        return bookMapper.entityToResponse(book);
    }

    @Override
    public HttpStatus deleteBook(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        Book book;

        if (!optionalBook.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        book = optionalBook.get();

        bookRepository.delete(book);

        return HttpStatus.OK;
    }
}
