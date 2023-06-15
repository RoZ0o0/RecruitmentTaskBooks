package recruitment.task.books.mapper;

import org.springframework.stereotype.Component;
import recruitment.task.books.dto.BookDTO;
import recruitment.task.books.entity.Book;

@Component
public class BookMapper {
    public static BookDTO mapToDTO(Book src) {
        BookDTO dest = new BookDTO();

        dest.setId(src.getId());
        dest.setTitle(src.getTitle());
        dest.setDescription(src.getDescription());

        return dest;
    }
}
