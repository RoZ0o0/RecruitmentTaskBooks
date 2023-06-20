CREATE TABLE IF NOT EXISTS books (
    book_id serial PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    genre_id INT NOT NULL,
    author VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT fk_genre
                   FOREIGN KEY (genre_id)
                   REFERENCES genre
                   ON DELETE SET NULL
);

INSERT INTO books("title", "genre_id", "author", "description")
VALUES ('It', 1, 'Stephen King', 'Grupa przyjaciół staje w obliczu tajemniczego potwora, który prześladuje ich od dzieciństwa. Przeskakując między przeszłością a teraźniejszością, próbują rozwiązać zagadkę i ostatecznie stawić czoła swoim największym lękom.'),
       ('Romeo i Julia', 2, 'William Shakespeare', 'Klasyczna historia miłosna, która opowiada o nieszczęśliwej miłości między dwoma młodymi ludźmi, których rodziny są skłócone. Ich nieodparta przyciągająca się siła prowadzi do tragicznego finału.'),
       ('Duma i uprzedzenie', 3, 'Jane Austen', 'W świecie wiktoriańskiego Anglii młoda Elizabeth Bennet musi zmierzyć się z własnymi uprzedzeniami i uprzedzeniami społeczeństwa, aby znaleźć prawdziwą miłość i szczęście.'),
       ('Władca Pierścieni', 4, 'J.R.R. Tolkien', 'Epicka saga, która opowiada o podróży grupy bohaterów w celu zniszczenia Pierścienia Władzy. Pełna przygód, magii i walki dobra ze złem.'),
       ('Neuromancer', 5, 'William Gibson', 'Książka, która wprowadziła pojęcie "cyberspaceu". W przyszłości żołnierz-komputerowiec, Neuromancer, zostaje wciągnięty w mroczną intrygę, w której nie ma pewności, co jest rzeczywistością, a co tylko wirtualnym światem.'),
       ('Steve Jobs', 6, 'Walter Isaacson', 'Biografia założyciela Apple, Stevea Jobsa, opisująca jego życie, wizję i wpływ na przemysł technologiczny.'),
       ('Dzieje Tristana i Izoldy', 7, 'Joseph Bédier', 'Średniowieczna legenda miłosna o tragicznej miłości między rycerzem Tristanem a księżniczką Izoldą, której przeszkodą jest polityka, zdrada i los.'),
       ('Opowieści z ciemnej strony', 1, 'Neil Gaiman', 'Zbiór krótkich opowiadań, w których Gaiman ukazuje mroczne, niesamowite i przerażające historie, które przenikają naszą rzeczywistość.'),
       ('Hamlet', 2, 'William Shakespeare', 'Klasyczna tragedia, która opowiada historię księcia Hamleta, który usiłuje pomścić śmierć swojego ojca i zmierza w stronę własnego tragicznego losu.'),
       ('Sto lat samotności', 3, 'Gabriel García Márquez', 'Saga rodzinna, która ukazuje losy rodu Buendía na przestrzeni stu lat. Przenikająca miłość, tajemnice i magia splatają się w tej epickiej opowieści.'),
       ('1984', 4, 'George Orwell', 'Przerażający portret totalitarnej przyszłości, w której indywidualizm i wolność są brutalnie tłumione. Historia ścigającego się z systemem bohatera, który próbuje zachować swoją ludzką godność.'),
       ('Fundacja', 5, 'Isaac Asimov', 'Pierwsza część serii "Fundacja", opowiadającej o upadku imperium galaktycznego i próbie ocalenia cywilizacji przez grupę naukowców.'),
       ('Autobiografia Malcolma X', 6, 'Malcolm X, Alex Haley', 'Malcolm X opowiada o swoim życiu, od młodości jako przestępcy po nawrócenie na islam i walkę o prawa czarnoskórych obywateli w Stanach Zjednoczonych.'),
       ('Zabić drozda', 7, 'Harper Lee', 'Opowieść o rasizmie i niesprawiedliwości w amerykańskim Południu lat 30. XX wieku, widzianej oczami młodej dziewczynki o imieniu Scout.'),
       ('Dracula', 1, 'Bram Stoker', 'Klasyczna powieść o wampirze, hrabim Drakuli, który pragnie rozpętać chaos i krwawą żądzę wiktoriańskim Londynie. Opowieść pełna napięcia i grozy.');