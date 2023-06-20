package recruitment.task.books.validator;

import org.springframework.stereotype.Component;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.repository.BookRepository;
import recruitment.task.books.repository.GenreRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class BookValidator {
    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;

    public BookValidator(BookRepository bookRepository, GenreRepository genreRepository) {
        this.bookRepository = bookRepository;
        this.genreRepository = genreRepository;
    }

    List<String> allowedSort = new ArrayList<>(Arrays.asList("title", "author", "genre.genreName"));
    List<Integer> allowedSize = new ArrayList<>(Arrays.asList(5, 10));

    public boolean validateBook(BookRequest bookRequest) {
        if (bookRequest.getTitle().length() < 1 || bookRequest.getTitle().isEmpty() || bookRequest.getTitle() == null) {
            return false;
        }
        if (bookRequest.getAuthor().length() < 6 || bookRequest.getAuthor().isEmpty() || bookRequest.getAuthor() == null) {
            return false;
        }
        if (bookRequest.getGenreId() < 1 || !genreRepository.findById(bookRequest.getGenreId()).isPresent()) {
            return false;
        }
        if (bookRequest.getDescription().length() < 30 || bookRequest.getDescription().isEmpty() || bookRequest.getDescription() == null) {
            return false;
        }

        return true;
    }

    public boolean validatePagination(int page, int size, String sort) {
        if (page < 0) {
            return false;
        }
        if (!allowedSize.contains(size)) {
            return false;
        }
        if (!allowedSort.contains(sort)) {
            return false;
        }

        return true;
    }

}
