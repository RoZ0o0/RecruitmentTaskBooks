CREATE TABLE IF NOT EXISTS genre(
    genre_id serial PRIMARY KEY NOT NULL,
    genre_name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO genre("genre_name")
VALUES ('Horror'),
       ('Dramat'),
       ('Romans'),
       ('Fantastyka'),
       ('Sci-Fi'),
       ('Biografia'),
       ('Historyczna');