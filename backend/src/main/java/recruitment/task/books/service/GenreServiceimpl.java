package recruitment.task.books.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import recruitment.task.books.dto.response.GenreResponse;
import recruitment.task.books.entity.Genre;
import recruitment.task.books.mapper.GenreMapper;
import recruitment.task.books.repository.GenreRepository;

import java.util.Optional;


@Service
public class GenreServiceimpl implements GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    public GenreServiceimpl(GenreRepository genreRepository, GenreMapper genreMapper) {
        this.genreRepository = genreRepository;
        this.genreMapper = genreMapper;
    }

    @Override
    public GenreResponse getGenreById(Long id) {
        Optional<Genre> optionalGenre = genreRepository.findById(id);
        if (!optionalGenre.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return genreMapper.entityToResponse(optionalGenre.get());
    }
}
