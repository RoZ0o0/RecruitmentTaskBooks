import React from "react";
import { createBook, getBooks, getGenres } from "../Services/HomeServices";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import '../Styles/Home.css';

class Home extends React.Component {
    state = {
        books: [],
        genres: [],
        openAdd: false,
        openInfo: false,
        openEdit: false,
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

    openInfoModal = (bookId) => {
        this.setState({
            openInfo: true,
            openedBook: {
                title: this.state.books[bookId].title,
                author: this.state.books[bookId].author,
                genreId: this.state.books[bookId].genre.genreId,
                description: this.state.books[bookId].description,
            }
        })
    }

    closeInfoModal = () => {
        this.setState({
            openInfo: false,
        })
    }

    openEditModal = (bookId) => {
        this.setState({
            openEdit: true,
            openedBook: {
                title: this.state.books[bookId].title,
                author: this.state.books[bookId].author,
                genreId: this.state.books[bookId].genre.genreId,
                description: this.state.books[bookId].description,
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
            console.log(state.book);
            await createBook(state.book);
            this.closeAddModal();
        }
    }

    async componentDidMount() {
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

        await getGenres().then((res) => {
            const genres = res.data;
            this.setState({ genres })
        });
    }
    
    render() {
        return (
            <div>
                <Modal
                    open={this.state.openAdd}
                    onClose={this.closeAddModal}
                >
                    <Box className='ModalBox'>
                        <h1>Dodaj książkę</h1>
                        <div>
                            <label>Tytuł</label><input type="text" name="title" onChange={this.changeBookCreate} />
                        </div>
                        <div>
                            <label>Gatunek</label>
                            <select name="genreId" onChange={this.changeBookCreate}>
                                {
                                    this.state.genres.map((genre) => 
                                        <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label>Autor</label><input type="text" name="author" onChange={this.changeBookCreate} />
                        </div>
                        <div>
                            <label>Opis</label><textarea name="description" onChange={this.changeBookCreate} />
                        </div>
                        <button onClick={() => this.addBook(this.state)}>Dodaj książkę</button>
                        {this.state.error && <p>{ this.state.error }</p> }
                    </Box>
                </Modal>
                <Modal
                    open={this.state.openInfo}
                    onClose={this.closeInfoModal}
                >
                    <Box className='ModalBox'>
                        <h1>Książka</h1>
                        <div>
                            <label>Tytuł</label><p>{this.state.openedBook.title}</p>
                        </div>
                        <div>
                            <label>Gatunek</label>
                            <select name="genreId" value={this.state.openedBook.genreId} readOnly>
                                <option value="1">Horror</option>
                                <option value="2">Dramat</option>
                            </select>
                        </div>
                        <div>
                            <label>Autor</label><p>{this.state.openedBook.author}</p>
                        </div>
                        <div>
                            <label>Opis</label><textarea name="description" value={this.state.openedBook.description} readOnly />
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={this.state.openEdit}
                    onClose={this.closeEditModal}
                >
                    <Box className='ModalBox'>
                        <h1>Edytuj książkę</h1>
                        <div>
                            <label>Tytuł</label><input type="text" name="title" value={this.state.openedBook.title} onChange={this.changeBookEdit} />
                        </div>
                        <div>
                            <label>Gatunek</label>
                            <select name="genreId" value={this.state.openedBook.genreId} onChange={this.changeBookEdit}>
                                {
                                    this.state.genres.map((genre) => 
                                        <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label>Autor</label><input type="text" name="author" value={this.state.openedBook.author} onChange={this.changeBookEdit} />
                        </div>
                        <div>
                            <label>Opis</label><textarea name="description" value={this.state.openedBook.description} onChange={this.changeBookEdit} />
                        </div>
                        <button onClick={() => this.addBook(this.state)}>Dodaj książkę</button>
                        {this.state.error && <p>{ this.state.error }</p> }
                    </Box>
                </Modal>
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
                                        <button onClick={() => this.openEditModal(index)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default Home;