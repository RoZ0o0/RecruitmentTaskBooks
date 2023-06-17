package recruitment.task.books.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recruitment.task.books.entity.Genre;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {
    private Long bookId;
    private String title;
    private Genre genre;
    private String author;
    private String description;
}
