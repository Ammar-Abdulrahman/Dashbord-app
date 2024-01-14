import * as React from 'react';
import { Modal , Button , Backdrop , Typography , Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { errorModalStyle } from '../../Theme/modal.style';

const ErrorModal = ({ open, onClose, errorMessage }) => {

    return (
    <Modal
        keepMounted
        open={open}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>
            <Box sx={errorModalStyle}>
                <Box display="flex" justifyContent="flex-end" >
                    <Button onClick={onClose} color="secondary" aria-label='close' >
                        <CloseIcon /> 
                    </Button>
                </Box>
                <Typography style={{marginTop:20 , marginLeft:30 , fontSize:20 }} id="keep-mounted-modal-title" variant="h6" component="h2">
                    Oops! 
                </Typography>
                <Typography style={{marginTop:20 , marginLeft:30}} id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    <span style={{color:"red"}}>{errorMessage}</span>
                </Typography>
            </Box>
        </Modal>
)
}

export default ErrorModal