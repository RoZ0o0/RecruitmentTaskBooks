import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function AddBookModal({state, changeBookCreate, closeAddModal, addBook}) {
    
    return (
        <>
            <Modal
                open={state.openAdd}
                onClose={closeAddModal}
            >
                <Box className='ModalBox'>
                    <h1>Dodaj książkę</h1>
                    <div>
                        <label>Tytuł</label><input type="text" name="title" onChange={changeBookCreate} />
                    </div>
                    <div>
                        <label>Gatunek</label>
                        <select name="genreId" onChange={changeBookCreate}>
                            {
                                state.genres.map((genre) => 
                                    <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label>Autor</label><input type="text" name="author" onChange={changeBookCreate} />
                    </div>
                    <div>
                        <label>Opis</label><textarea name="description" onChange={changeBookCreate} />
                    </div>
                    <button onClick={() => addBook(state)}>Dodaj książkę</button>
                    {state.error && <p>{ state.error }</p> }
                </Box>
            </Modal>
        </>
    )
}

export default AddBookModal;