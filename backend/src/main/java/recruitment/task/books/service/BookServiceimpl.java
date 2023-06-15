package recruitment.task.books.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recruitment.task.books.dto.BookDTO;
import recruitment.task.books.entity.Book;
import recruitment.task.books.mapper.BookMapper;
import recruitment.task.books.repository.BookRepository;

@Service
public class BookServiceimpl implements BookService {
    @Autowired
    BookRepository bookRepository;

    @Override
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id);

        return BookMapper.mapToDTO(book);
    }
}
