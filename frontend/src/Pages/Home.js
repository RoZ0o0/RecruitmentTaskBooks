import React from "react";

import { createBook, editBook, deleteBook, getBooksPaginated, searchBooks, getGenres } from "../Services/HomeServices";
import { TablePagination } from "@mui/material";

import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';

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
        search: '',
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
            openAdd: true,
            error: ""
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
                genreName: this.state.books[index].genre.genreName,
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
            error: "",
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

    changeSearchBook = (event) => {
        this.setState({
            search: event.target.value
        });
    }

    sortTitle = () => {
        this.setState({
            sort: 'title',
            order: !this.state.order,
            currentPage: 0
        });
        if (this.state.search === "") {
            this.getBooksPaginated(0, this.state.pageSize, !this.state.order, 'title');
        } else {
            this.searchBooks(0, this.state.pageSize, this.state.order, 'title', this.state.search);
        }
    }

    sortGenre = () => {
        this.setState({
            sort: 'genre.genreName',
            order: !this.state.order,
            currentPage: 0
        })
        if (this.state.search === "") {
            this.getBooksPaginated(0, this.state.pageSize, !this.state.order, 'genre.genreName');
        } else {
            this.searchBooks(0, this.state.pageSize, this.state.order, 'genre.genreName', this.state.search);
        }
    }

    sortAuthor = () => {
        this.setState({
            sort: 'author',
            order: !this.state.order,
            currentPage: 0
        })
        if (this.state.search === "") {
            this.getBooksPaginated(0, this.state.pageSize, !this.state.order, 'author');
        } else {
            this.searchBooks(0, this.state.pageSize, this.state.order, 'author', this.state.search);
        }
    }

    pageChange = (event, newPage) => {
        this.setState({
            currentPage: (newPage)
        })
        if (this.state.search === "") {
            this.getBooksPaginated(newPage, this.state.pageSize, this.state.order, this.state.sort);
        } else {
            this.searchBooks(newPage, this.state.pageSize, this.state.order, this.state.sort, this.state.search);
        }
    }

    pageSizeChange = (event) => {
        this.setState({
            pageSize: parseInt(event.target.value, 10),
            currentPage: 0
        })
        if (this.state.search === "") {
            this.getBooksPaginated(0, parseInt(event.target.value, 10), this.state.order, this.state.sort);
        } else {
            this.searchBooks(0, parseInt(event.target.value, 10), this.state.order, this.state.sort, this.state.search);
        }
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
            this.getBooksPaginated(this.state.currentPage, this.state.pageSize, this.state.order, this.state.sort);
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
            this.getBooksPaginated(this.state.currentPage, this.state.pageSize, this.state.order, this.state.sort);
            this.setState({
                search: ""
            })
            Swal.fire(
                'Edytowano!',
                'Książka została edytowana.',
                'success'
            )
        }
    }

    async deleteBook(bookId) {
        await deleteBook(bookId);
        this.getBooksPaginated(this.state.currentPage, this.state.pageSize, this.state.order, this.state.sort);
        this.setState({
            search: ""
        })
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

    async getBooksPaginated(currentPage, pageSize, order, sort) {
        await getBooksPaginated(currentPage, pageSize, order, sort).then((res) => {
            const books = res.data.content;
            const total = res.data.totalElements;
            console.log(res);
            this.setState({ 
                books,
                total
            });
        });
    }

    async searchBooks(currentPage, pageSize, order, sort, search) {
        await searchBooks(currentPage, pageSize, order, sort, search).then((res) => {
            const books = res.data.content;
            const total = res.data.totalElements;
            this.setState({ 
                books,
                total
             });
        })
    }

    async componentDidMount() {
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
                    <h2>Książki</h2>
                    <div className="ToolBar">
                        <div className="SearchBar">
                            <input type="text" onChange={this.changeSearchBook}/>
                            <SearchIcon onClick={() => this.searchBooks(this.state.currentPage, this.state.pageSize, this.state.order, this.state.sort, this.state.search)}/>
                        </div>
                        <div className="AddButton">
                            <AddIcon className="ModalButton"
                                sx={{
                                    backgroundColor: "#3dc44f",
                                    borderRadius: 1
                                }} 
                                onClick={this.openAddModal} />
                        </div>
                    </div>
                    <table className="BookTable">
                        <thead>
                            <tr>
                                <th className="BookHeader">
                                    <div onClick={this.sortTitle}>
                                        <span>Tytuł</span>
                                        {(this.state.order === true && this.state.sort === 'title') &&
                                            <ArrowDropDownIcon />
                                        }
                                        {(this.state.order === false && this.state.sort === 'title') &&
                                            <ArrowDropUpIcon />
                                        }
                                        {this.state.sort !== 'title' &&
                                            <ArrowDropDownIcon />
                                        }
                                    </div>
                                </th>
                                <th className="BookHeader">
                                    <div onClick={this.sortGenre}>
                                        <span>Gatunek</span>
                                        {(this.state.order === true && this.state.sort === 'genre.genreName') &&
                                            <ArrowDropDownIcon />
                                        }
                                        {(this.state.order === false && this.state.sort === 'genre.genreName') &&
                                            <ArrowDropUpIcon />
                                        }
                                        {this.state.sort !== 'genre.genreName' &&
                                            <ArrowDropDownIcon />
                                        }
                                    </div>
                                </th>
                                <th className="BookHeader">
                                <div onClick={this.sortAuthor}>
                                        <span>Autor</span>
                                        {(this.state.order === true && this.state.sort === 'author') &&
                                            <ArrowDropDownIcon />
                                        }
                                        {(this.state.order === false && this.state.sort === 'author') &&
                                            <ArrowDropUpIcon />
                                        }
                                        {this.state.sort !== 'author' &&
                                            <ArrowDropDownIcon />
                                        }
                                    </div>
                                </th>
                                <th className="BookHeader">
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
                                        <td>{book.author}</td>
                                        <td className="BookData">
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