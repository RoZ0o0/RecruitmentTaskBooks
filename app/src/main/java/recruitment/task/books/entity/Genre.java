package recruitment.task.books.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "genre")
@Getter
@Setter
@NoArgsConstructor
public class Genre implements Serializable {
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long genreId;
    @Column(nullable = false, name = "genre_name")
    private String genreName;

    public Genre(String genreName) {
        this.genreName = genreName;
    }
}
