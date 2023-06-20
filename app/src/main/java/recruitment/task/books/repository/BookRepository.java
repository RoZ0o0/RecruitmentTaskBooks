package recruitment.task.books.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import recruitment.task.books.entity.Book;
import recruitment.task.books.entity.Genre;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {
    Optional<Book> findById(Long id);
    List<Book> findAll();
    static Specification<Book> search(String search) {
        return (r, q, b) -> {
            Join<Book, Genre> joinGenre = r.join("genre");
            Predicate predicate = b.or(
                    b.like(b.lower(r.get("title")), "%" + search.toLowerCase() + "%"),
                    b.like(b.lower(r.get("author")), "%" + search.toLowerCase() + "%"),
                    b.like(b.lower(joinGenre.get("genreName")), "%" + search.toLowerCase() + "%")
            );

            return predicate;
        };
    }
}
