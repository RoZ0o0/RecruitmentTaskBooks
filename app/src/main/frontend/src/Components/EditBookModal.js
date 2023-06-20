import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function EditBookModal({state, changeBookEdit, closeEditModal, editBook}) {
    
    return (
        <>
            <Modal
                open={state.openEdit}
                onClose={closeEditModal}
            >
                <Box className='ModalBox'>
                    <h1>Edytuj książkę</h1>
                    <div className='Title'>
                        <label>Tytuł: </label><input type="text" name="title" value={state.openedBook.title} onChange={changeBookEdit} />
                    </div>
                    <div className='Genre'>
                        <label>Gatunek</label>
                        <select name="genreId" value={state.openedBook.genreId} onChange={changeBookEdit}>
                            {
                                state.genres.map((genre) => 
                                    <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='Author'>
                        <label>Autor: </label><input type="text" name="author" value={state.openedBook.author} onChange={changeBookEdit} />
                    </div>
                    <div className='Description'>
                        <label>Opis: </label><textarea name="description" value={state.openedBook.description} onChange={changeBookEdit} />
                    </div>
                    <div className='EditBook'>
                        <button onClick={() => editBook(state.editId, state.openedBook)}>Edytuj książkę</button>
                        {state.error && <p>{ state.error }</p> }
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditBookModal;