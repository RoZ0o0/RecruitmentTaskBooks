package recruitment.task.books.book;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recruitment.task.books.dto.request.BookRequest;
import recruitment.task.books.dto.response.BookResponse;
import recruitment.task.books.entity.Book;
import recruitment.task.books.mapper.BookMapper;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = "init.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "teardown.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class BookTests {
    private final String HTTP_ADDRESS = "http://localhost:8080/api/books";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookMapper bookMapper;

    @Test
    void PostRequest_createBook_thenReturns200() throws Exception {
        BookRequest testBook = new BookRequest("Test Title 2", 1L, "Test Author 2", "Test Description 2 Test Description 2 Test Description 2 Test Description 2");
        Book expectedBook = bookMapper.mapToEntity(testBook);
        BookResponse expectedBookResponse = bookMapper.entityToResponse(expectedBook);
        expectedBookResponse.setBookId(6L);

        mockMvc.perform(MockMvcRequestBuilders
                .post(HTTP_ADDRESS)
                .content(new ObjectMapper().writeValueAsString(testBook))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(expectedBookResponse)));
    }

    @Test
    void PostRequest_createBook_thenReturns422() throws Exception {
        BookRequest testBook = new BookRequest("Test Title 2", 1L, "Test Author 2", "Test Description 2");
        Book expectedBook = bookMapper.mapToEntity(testBook);
        BookResponse expectedBookResponse = bookMapper.entityToResponse(expectedBook);
        expectedBookResponse.setBookId(6L);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(HTTP_ADDRESS)
                        .content(new ObjectMapper().writeValueAsString(testBook))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnprocessableEntity());
    }

    @Test
    void PutRequest_updateBook_thenReturns200() throws Exception {
        BookRequest testBook = new BookRequest("Test Title2", 1L, "Test Author", "TestDescription TestDescription TestDescription TestDescription");
        Book expectedBook = bookMapper.mapToEntity(testBook);
        BookResponse expectedBookResponse = bookMapper.entityToResponse(expectedBook);
        expectedBookResponse.setBookId(4L);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(HTTP_ADDRESS + "/{id}", 4)
                        .content(new ObjectMapper().writeValueAsString(testBook))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(expectedBookResponse)));
    }

    @Test
    void PutRequest_updateBook_thenReturns422() throws Exception {
        BookRequest testBook = new BookRequest("Test Title2", 1L, "Test Author", "TestDescription");
        Book expectedBook = bookMapper.mapToEntity(testBook);
        BookResponse expectedBookResponse = bookMapper.entityToResponse(expectedBook);
        expectedBookResponse.setBookId(4L);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(HTTP_ADDRESS + "/{id}", 4)
                        .content(new ObjectMapper().writeValueAsString(testBook))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnprocessableEntity());
    }
}
