import React from 'react';
import { Alert , AlertTitle , Typography , Modal , Backdrop , Button , Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 450,height: 250,bgcolor: 'background.paper',boxShadow: 24,borderRadius:5,p: 4,};


const AlertMessage = ({ open, onClose, message }) => {
    return (
        <>
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
        <Box sx={style}>
            <Box display="flex" justifyContent="flex-end" >
                <Button onClick={onClose} color="secondary" aria-label='close' >
                    <CloseIcon /> 
                </Button>
            </Box>
            <Typography style={{marginTop:-10}} id="keep-mounted-modal-title" variant="h6" component="h2">
                Success 
            </Typography>
            <Box style={{marginTop:30 , fontSize:19 }} open={open} autoHideDuration={1000} >
            { 
            swal("Poof! "+ {message} + " " , {
            icon: "success",
            })
            }
            </Box>
        </Box>
    </Modal>
    </>
    )
}

export default AlertMessage;