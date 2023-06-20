import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function BookInfoModal({state, closeInfoModal}) {
    
    return (
        <>
            <Modal
                open={state.openInfo}
                onClose={closeInfoModal}
            >
                <Box className='ModalBox ModalBoxInfo'>
                    <h1>Książka</h1>
                    <div className='Info'>
                        <p>"{state.openedBook.title}",</p>
                        <p>{state.openedBook.author}, </p>
                        <p>{state.openedBook.genreName}</p>
                    </div>
                    <div className='InfoDescription'>
                        <h2>Opis</h2>
                        <p>{state.openedBook.description}</p>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default BookInfoModal;