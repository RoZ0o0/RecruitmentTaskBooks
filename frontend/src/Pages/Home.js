import React from "react";
import { createBook, editBook, deleteBook, getBooks, getGenres } from "../Services/HomeServices";
import AddBookModal from "../Components/AddBookModal";
import BookInfoModal from "../Components/BookInfoModal";
import EditBookModal from "../Components/EditBookModal";
import Swal from "sweetalert2";
import "../Styles/Home.css";

class Home extends React.Component {
    state = {
        books: [],
        genres: [],
        openAdd: false,
        openInfo: false,
        openEdit: false,
        editId: 0,
        openedBook: {
            title: '',
            author: '',
            genreId: 0,
            description: ''
        },
        book: {
            title: '',
            author: '',
            genreId: 1,
            description: ''
        },
        error: ''
    };

    openAddModal = () => {
        this.setState({
            openAdd: true
        })
    }

    closeAddModal = () => {
        this.setState({
            openAdd: false,
            error: ''
        })
    }

    openInfoModal = (index) => {
        this.setState({
            openInfo: true,
            openedBook: {
                title: this.state.books[index].title,
                author: this.state.books[index].author,
                genreId: this.state.books[index].genre.genreId,
                description: this.state.books[index].description,
            }
        })
    }

    closeInfoModal = () => {
        this.setState({
            openInfo: false,
        })
    }

    openEditModal = (index, bookId) => {
        this.setState({
            openEdit: true,
            editId: bookId,
            openedBook: {
                title: this.state.books[index].title,
                author: this.state.books[index].author,
                genreId: this.state.books[index].genre.genreId,
                description: this.state.books[index].description,
            }
        })
    }

    closeEditModal = () => {
        this.setState({
            openEdit: false,
        })
    }

    changeBookCreate = (event) => {
        this.setState({
            book: {
                ...this.state.book,
                [event.target.name]: event.target.value
            }
        });
    }

    changeBookEdit = (event) => {
        this.setState({
            openedBook: {
                ...this.state.openedBook,
                [event.target.name]: event.target.value
            }
        });
    }

    async addBook(state) {
        if (state.book.title === '' || state.book.title === undefined || state.book.title.length < 1) {
            this.setState({
                error: 'Tytuł jest pusty!'
            })
        } else if (state.book.genreId < 1) {
            this.setState({
                error: 'Gatunek jest błędny!'
            })
        } else if (state.book.author === '' || state.book.author === undefined) {
            this.setState({
                error: 'Autor jest pusty!'
            })
        } else if (state.book.author.length < 6) {
            this.setState({
                error: 'Podany autor jest za krótki!'
            })
        } else if (state.book.author.length > 30) {
            this.setState({
                error: 'Podany autor jest za długi!'
            })
        } else if (state.book.description.length < 30) {
            this.setState({
                error: 'Podany opis jest za krótki!'
            })
        } else if (state.book.description.length > 300) {
            this.setState({
                error: 'Podany opis jest za długi!'
            })
        } else {
            await createBook(state.book);
            this.closeAddModal();
            this.getBooks();
            Swal.fire(
                'Dodano!',
                'Książka została dodana.',
                'success'
            )
        }
    }

    async editBook(bookId, book) {
        if (book.title === '' || book.title === undefined || book.title.length < 1) {
            this.setState({
                error: 'Tytuł jest pusty!'
            })
        } else if (book.genreId < 1) {
            this.setState({
                error: 'Gatunek jest błędny!'
            })
        } else if (book.author === '' || book.author === undefined) {
            this.setState({
                error: 'Autor jest pusty!'
            })
        } else if (book.author.length < 6) {
            this.setState({
                error: 'Podany autor jest za krótki!'
            })
        } else if (book.author.length > 30) {
            this.setState({
                error: 'Podany autor jest za długi!'
            })
        } else if (book.description.length < 30) {
            this.setState({
                error: 'Podany opis jest za krótki!'
            })
        } else if (book.description.length > 300) {
            this.setState({
                error: 'Podany opis jest za długi!'
            })
        } else {
            await editBook(bookId, book);
            this.closeEditModal();
            this.getBooks();
            Swal.fire(
                'Edytowano!',
                'Książka została edytowana.',
                'success'
            )
        }
    }

    async deleteBook(bookId) {
        await deleteBook(bookId);
        this.getBooks();
    }

    async deleteAlert(bookId) {
        Swal.fire({
            title: 'Jesteś pewien?',
            text: "Nie będziesz mógł tego cofnąć!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Tak, usuń!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteBook(bookId);
                Swal.fire(
                'Usunięto!',
                'Książka została usunięta.',
                'success'
                )
            }
        })
    }

    async getBooks() {
        await getBooks().then((res) => {
            const books = res.data;
            this.setState({ books })
        }).catch(error => {
            if (!error.response) {
                this.errorStatus = 'Network Error';
            } else {
                this.errorStatus = error.response.data.message;
            }
        });
    }

    async componentDidMount() {
        this.getBooks();
        await getGenres().then((res) => {
            const genres = res.data;
            this.setState({ genres })
        });
    }
    
    render() {
        return (
            <>
                <div>
                    <h2>Books</h2>
                    <div className="ButtonDiv">
                        <button className="ModalButton" onClick={this.openAddModal}>Dodaj książkę</button>
                    </div>
                    <table className="BookTable">
                        <thead>
                            <tr>
                                <th>Tytuł</th>
                                <th>Gatunek</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map((book, index) => 
                                    <tr key={book.bookId}>
                                        <td>{book.title}</td>
                                        <td>{book.genre.genreName}</td>
                                        <td>
                                            <button onClick={() => this.openInfoModal(index)}>Info</button>
                                            <button onClick={() => this.openEditModal(index, book.bookId)}>Edit</button>
                                            <button onClick={() => this.deleteAlert(book.bookId)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <AddBookModal
                    state={this.state}
                    changeBookCreate={this.changeBookCreate}
                    closeAddModal={this.closeAddModal}
                    addBook={() => this.addBook(this.state)}
                 />
                <BookInfoModal
                    state={this.state}
                    closeInfoModal={this.closeInfoModal}
                />
                <EditBookModal
                    state={this.state}
                    changeBookEdit={this.changeBookEdit}
                    closeEditModal={this.closeEditModal}
                    editBook={() => this.editBook(this.state.editId, this.state.openedBook)}
                />
            </>
        );
    }
};

export default Home;