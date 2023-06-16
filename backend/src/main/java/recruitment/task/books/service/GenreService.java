package recruitment.task.books.service;

import recruitment.task.books.dto.response.GenreResponse;

public interface GenreService {
    GenreResponse getGenreById(Long id);
}
