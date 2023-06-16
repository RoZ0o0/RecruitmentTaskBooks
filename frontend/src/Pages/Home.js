import React from "react";
import { getBooks } from "../Services/HomeServices";

class Home extends React.Component {
    state = {
        books: []
    };

    async componentDidMount() {
        await getBooks().then((res) => {
            const books = res.data;
            this.setState({ books })
        });
    }
    
    render() {
        return (
            <div>
                <h2>Clients</h2>
                {
                    this.state.books.map(book => <span key={book.id}>{book.title}</span>)
                }
            </div>
        );
    }
};

export default Home;