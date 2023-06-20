DELETE
FROM books;

ALTER SEQUENCE books_book_id_seq
    RESTART WITH 1;

INSERT INTO books("title", "genre_id", "author", "description")
VALUES ('Test Title', 1, 'Test Author', 'TestDescription TestDescription TestDescription TestDescription'),
       ('Test Title', 1, 'Test Author', 'TestDescription TestDescription TestDescription TestDescription'),
       ('Test Title', 1, 'Test Author', 'TestDescription TestDescription TestDescription TestDescription'),
       ('Test Title', 1, 'Test Author', 'TestDescription TestDescription TestDescription TestDescription'),
       ('Test Title', 1, 'Test Author', 'TestDescription TestDescription TestDescription TestDescription');