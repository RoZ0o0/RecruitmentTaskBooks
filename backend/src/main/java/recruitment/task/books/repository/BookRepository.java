package recruitment.task.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recruitment.task.books.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findById(Long id);
}
