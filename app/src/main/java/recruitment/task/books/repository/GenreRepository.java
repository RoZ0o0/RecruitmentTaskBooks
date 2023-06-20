package recruitment.task.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recruitment.task.books.entity.Genre;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    Optional<Genre> findById(Long id);
}
