import React from 'react';
import { Modal,Box, Backdrop ,Button,Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { confirmModalStyle } from '../../Theme/modal.style';


    const ConfirmationModal = ({ open, onClose, onConfirm, item }) => {

        const itemName = item && item.name ? item.name: " ";
        const itemTitle = item && item.title ? item.title :"";

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
            <Box sx={confirmModalStyle}>
                <Box display="flex" justifyContent="flex-end" >
                    <Button onClick={onClose} style={{color:"#F46609"}} aria-label='close' >
                        <CloseIcon /> 
                    </Button>
                </Box>
                <Typography style={{marginTop:-10 , color:"#3E51FA "}} id="keep-mounted-modal-title" variant="h6" component="h2">
                    Confimation this Delete 
                </Typography>
                <Typography style={{marginTop:20}} id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete <span style={{color:"#F46609"}}>{itemName + itemTitle }</span> ?
                </Typography>
                <Button style={{marginTop:30 , marginLeft:0}} onClick={onConfirm} variant="contained" color="error">
                    Confirm
                </Button>
                <Button style={{marginTop:30 , backgroundColor:"#3E51FA" , marginLeft:10}} onClick={onClose} variant="contained">
                    Cancel
                </Button>
            </Box>
        </Modal>
    )
}

export default ConfirmationModal;