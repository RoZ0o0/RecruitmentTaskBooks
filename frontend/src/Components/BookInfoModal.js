import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function BookInfoModal({state, closeInfoModal}) {
    
    return (
        <>
            <Modal
                open={state.openInfo}
                onClose={closeInfoModal}
            >
                <Box className='ModalBox'>
                    <h1>Książka</h1>
                    <div>
                        <label>Tytuł</label><p>{state.openedBook.title}</p>
                    </div>
                    <div>
                        <label>Gatunek</label>
                        <select name="genreId" value={state.openedBook.genreId} readOnly>
                            <option value="1">Horror</option>
                            <option value="2">Dramat</option>
                        </select>
                    </div>
                    <div>
                        <label>Autor</label><p>{state.openedBook.author}</p>
                    </div>
                    <div>
                        <label>Opis</label><textarea name="description" value={state.openedBook.description} readOnly />
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default BookInfoModal;