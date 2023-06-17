import React from "react";
import { getBooks } from "../Services/HomeServices";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import '../Styles/Home.css';


class Home extends React.Component {
    state = {
        books: [],
        open: false
    };

    openModal = () => {
        this.setState({
            open: true
        })
    }

    closeModal = () => {
        this.setState({
            open: false
        })
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
    }
    
    render() {
        return (
            <div>
                <Modal
                    open={this.state.open}
                    onClose={this.closeModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box className='ModalBox'>
                        <h1>Dodaj książkę</h1>
                        <div>
                            <span>Tytuł</span><input type="text" />
                        </div>
                        <div>
                            <span>Gatunek</span><input type="text" />
                        </div>
                        <div>
                            <span>Autor</span><input type="text" />
                        </div>
                        <div>
                            <span>Opis</span><textarea />
                        </div>
                    </Box>
                </Modal>
                <h2>Books</h2>
                <button className="ModalButton" onClick={this.openModal}>Test</button>
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
                            this.state.books.map(book => 
                                <tr key={book.bookId}>
                                    <td>{book.title}</td>
                                    <td>{book.genre.genreName}</td>
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