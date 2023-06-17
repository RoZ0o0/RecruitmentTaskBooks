package recruitment.task.books.mapper;

import org.springframework.stereotype.Component;
import recruitment.task.books.dto.response.GenreResponse;
import recruitment.task.books.entity.Genre;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenreMapper {
    public GenreResponse entityToResponse(Genre src) {
        GenreResponse dest = new GenreResponse();

        dest.setGenreId(src.getGenreId());
        dest.setGenreName(src.getGenreName());

        return dest;
    }

    public List<GenreResponse> mapToList(List<Genre> srcList) {
        List<GenreResponse> destList = new ArrayList<>();
        for(Genre srcEntity: srcList) {
            destList.add(entityToResponse(srcEntity));
        }

        return destList;
    }
}
