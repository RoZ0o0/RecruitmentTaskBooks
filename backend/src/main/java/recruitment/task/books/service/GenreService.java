package recruitment.task.books.service;

import recruitment.task.books.dto.response.GenreResponse;

import java.util.List;

public interface GenreService {
    List<GenreResponse> getAll();
    GenreResponse getGenreById(Long id);
}
