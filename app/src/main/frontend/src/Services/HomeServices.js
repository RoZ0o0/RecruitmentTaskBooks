import axios from 'axios';

export const getBooksPaginated = (page, size, order, sort) => {
    return axios.get(`http://localhost:8080/api/books/getPage?page=` + page + `&size=` + size + `&order=` + order + `&sort=` + sort);
}

export const searchBooks = (page, size, order, sort, search) => {
    return axios.get(`http://localhost:8080/api/books/search?page=` + page + `&size=` + size + `&order=` + order + `&sort=` + sort + `&search=` + search);
}

export const getGenres = () => {
    return axios.get(`http://localhost:8080/api/genres`);
}

export const createBook = (book) => {
    return axios.post(`http://localhost:8080/api/books`, book);
}

export const editBook = (id, book) => {
    return axios.put(`http://localhost:8080/api/books/` + id, book);
}

export const deleteBook = (id) => {
    return axios.delete(`http://localhost:8080/api/books/` + id);
}