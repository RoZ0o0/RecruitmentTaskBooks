package recruitment.task.books.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recruitment.task.books.dto.response.GenreResponse;
import recruitment.task.books.service.GenreService;

@RestController
@RequestMapping("/api/genres")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/{id}")
    public GenreResponse getGenreById(@PathVariable Long id) {
        return genreService.getGenreById(id);
    }
}
