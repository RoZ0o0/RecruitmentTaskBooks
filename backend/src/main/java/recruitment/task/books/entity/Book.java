package recruitment.task.books.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
public class Book implements Serializable {
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long bookId;
    @Column(nullable = false)
    private String title;
    @ManyToOne(optional = false)
    @JoinColumn(name = "genre_id")
    private Genre genre;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String description;

    public Book(String title, Genre genre, String author, String description) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.description = description;
    }
}
