package recruitment.task.books.mapper;

import org.springframework.stereotype.Component;
import recruitment.task.books.dto.response.GenreResponse;
import recruitment.task.books.entity.Genre;

@Component
public class GenreMapper {
    public GenreResponse entityToResponse(Genre src) {
        GenreResponse dest = new GenreResponse();

        dest.setGenreId(src.getGenreId());
        dest.setGenreName(src.getGenreName());

        return dest;
    }
}
