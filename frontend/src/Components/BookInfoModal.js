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
                    <div className='Title'>
                        <label>Tytuł: </label><p>{state.openedBook.title}</p>
                    </div>
                    <div className='Genre'>
                        <label>Gatunek: </label>
                        <p>{state.openedBook.genreName}</p>
                    </div>
                    <div className='Author'>
                        <label>Autor: </label><p>{state.openedBook.author}</p>
                    </div>
                    <div className='Description'>
                        <label>Opis: </label><textarea name="description" value={state.openedBook.description} readOnly cha/>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default BookInfoModal;