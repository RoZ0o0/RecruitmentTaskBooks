import React from "react";

import { createBook, editBook, deleteBook, getBooks, getBooksPaginated, getGenres } from "../Services/HomeServices";
import { TablePagination } from "@mui/material";

import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import AddBookModal from "../Components/AddBookModal";
import BookInfoModal from "../Components/BookInfoModal";
import EditBookModal from "../Components/EditBookModal";
import Swal from "sweetalert2";

import "../Styles/Home.css";

class Home extends React.Component {
    state = {
        books: [],
        genres: [],
        currentPage: 0,
        total: 0,
        order: true,
        sort: 'title',
        pageSize: 5,
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

    sortTitle = () => {
        this.setState({
            sort: 'title',
            order: !this.state.order,
            currentPage: 0
        });
        this.getBooksPaginated(0, this.state.pageSize, !this.state.order, 'title');
    }

    sortGenre = () => {
        this.setState({
            sort: 'genre.genreName',
            order: !this.state.order,
            currentPage: 0
        })
        this.getBooksPaginated(0, this.state.pageSize, !this.state.order, 'genre.genreName');
    }

    pageChange = (event, newPage) => {
        this.setState({
            currentPage: (newPage)
        })
        this.getBooksPaginated(newPage, this.state.pageSize, this.state.order, this.state.sort);
    }

    pageSizeChange = (event) => {
        this.setState({
            pageSize: parseInt(event.target.value, 10),
            currentPage: 0
        })
        this.getBooksPaginated(0, parseInt(event.target.value, 10), this.state.order, this.state.sort);
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
            const total = res.data.length;
            this.setState({ total });
        }).catch(error => {
            if (!error.response) {
                this.errorStatus = 'Network Error';
            } else {
                this.errorStatus = error.response.data.message;
            }
        });
    }

    async getBooksPaginated(currentPage, pageSize, order, sort) {
        await getBooksPaginated(currentPage, pageSize, order, sort).then((res) => {
            const books = res.data;
            this.setState({ books });
        });
    }

    async componentDidMount() {
        this.getBooks();
        this.getBooksPaginated(this.state.currentPage, this.state.pageSize, this.state.order, this.state.sort);
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
                        <AddIcon className="ModalButton" onClick={this.openAddModal} />
                    </div>
                    <table className="BookTable">
                        <thead>
                            <tr>
                                <th className="TableHeader">
                                    <div>
                                        <span>Tytuł</span>
                                        {(this.state.order === true && this.state.sort === 'title') &&
                                            <ArrowDropDownIcon onClick={this.sortTitle}/>
                                        }
                                        {(this.state.order === false && this.state.sort === 'title') &&
                                            <ArrowDropUpIcon onClick={this.sortTitle} />
                                        }
                                        {this.state.sort !== 'title' &&
                                            <ArrowDropDownIcon onClick={this.sortTitle}/>
                                        }
                                    </div>
                                </th>
                                <th className="TableHeader">
                                    <div>
                                        <span>Gatunek</span>
                                        {(this.state.order === true && this.state.sort === 'genre.genreName') &&
                                            <ArrowDropDownIcon onClick={this.sortGenre}/>
                                        }
                                        {(this.state.order === false && this.state.sort === 'genre.genreName') &&
                                            <ArrowDropUpIcon onClick={this.sortGenre} />
                                        }
                                        {this.state.sort !== 'genre.genreName' &&
                                            <ArrowDropDownIcon onClick={this.sortGenre}/>
                                        }
                                    </div>
                                </th>
                                <th className="TableHeader">
                                    Akcja
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map((book, index) => 
                                    <tr key={book.bookId}>
                                        <td>{book.title}</td>
                                        <td>{book.genre.genreName}</td>
                                        <td className="TableData">
                                            <DescriptionIcon onClick={() => this.openInfoModal(index)} />
                                            <EditIcon onClick={() => this.openEditModal(index, book.bookId)} />
                                            <DeleteIcon onClick={() => this.deleteAlert(book.bookId)} />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <TablePagination 
                        component="div"
                        className="TablePagination"
                        count={this.state.total}
                        page={this.state.currentPage}
                        onPageChange={this.pageChange}
                        rowsPerPage={this.state.pageSize}
                        onRowsPerPageChange={this.pageSizeChange}
                        rowsPerPageOptions={[5, 10]}
                        labelRowsPerPage="Wiersze na strone:"
                        labelDisplayedRows={
                            ({ from, to, count }) => {
                                return '' + from + '-' + to + ' do ' + count
                            }
                        }
                    />
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