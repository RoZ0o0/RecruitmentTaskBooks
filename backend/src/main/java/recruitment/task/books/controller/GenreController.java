package recruitment.task.books.controller;

import org.springframework.web.bind.annotation.*;
import recruitment.task.books.dto.response.GenreResponse;
import recruitment.task.books.service.GenreService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/genres")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping()
    public List<GenreResponse> getAll() { return genreService.getAll(); }

    @GetMapping("/{id}")
    public GenreResponse getGenreById(@PathVariable Long id) {
        return genreService.getGenreById(id);
    }
}
