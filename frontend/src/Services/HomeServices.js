import axios from 'axios';

export const getBooks = () => {
    return axios.get(`http://localhost:8080/api/books`);
}