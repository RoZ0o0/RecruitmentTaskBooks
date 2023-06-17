package recruitment.task.books.mapper;

import org.springframework.stereotype.Component;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;
import recruitment.task.books.entity.Book;
import recruitment.task.books.repository.GenreRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookMapper {
    private final GenreRepository genreRepository;

    public BookMapper(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public BookResponse entityToResponse(Book src) {
        BookResponse dest = new BookResponse();

        dest.setBookId(src.getBookId());
        dest.setTitle(src.getTitle());
        dest.setAuthor(src.getAuthor());
        dest.setGenre(src.getGenre());
        dest.setDescription(src.getDescription());

        return dest;
    }

    public Book mapToEntity(BookRequest src) {
        Book dest = new Book();

        dest.setTitle(src.getTitle());
        dest.setAuthor(src.getAuthor());
        dest.setGenre(genreRepository.findById(src.getGenreId()).orElse(null));
        dest.setDescription(src.getDescription());

        return dest;
    }

    public void mapToEntity(Book dest, BookRequest src) {
        dest.setTitle(src.getTitle());
        dest.setAuthor(src.getAuthor());
        dest.setGenre(genreRepository.findById(src.getGenreId()).orElse(null));
        dest.setDescription(src.getDescription());
    }

    public List<BookResponse> mapToList(List<Book> srcList) {
        List<BookResponse> destList = new ArrayList<>();
        for(Book srcEntity: srcList) {
            destList.add(entityToResponse(srcEntity));
        }

        return destList;
    }
}
