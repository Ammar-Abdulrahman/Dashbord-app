import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Box, Button, Typography ,TextField, AppBar } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { fetchDataItemById } from '../../API/Service/apiService';
import Loader from '../Loader/App-Loader';
import { showModalStyle } from '../../Theme/modal.style';

const ShowItemModal = ({ open, onClose, itemId, resource ,title, fields }) => {
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState({});
    useEffect(() => {
        if (open && itemId && resource) {
        setLoading(true);
        fetchDataItemById(resource, itemId)
            .then((response) => {
            setItemData(response.data);
            setLoading(false);
            })
            .catch((error) => {
            console.error(error);
            setLoading(false);
            });
        }
        }, [open, itemId , resource]);
    
        const handleClose = () => {
        setItemData({});
        onClose();
        };
    
        return (
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="show-modal-title"
        aria-describedby="show-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
            <Box sx={showModalStyle}>
                <Box display="flex" justifyContent="flex-end">
                </Box >
                <AppBar style={{height:60 , backgroundColor:"#3E51FA", padding:2}} id="show-modal-title" variant="h6">
                    <Button onClick={handleClose} style={{marginTop:8 , position:"absolute" , marginLeft:525 ,color:"white"}} aria-label="close">
                        <ForwardIcon />
                    </Button>
                    <span style={{marginLeft:30 , marginTop:13 , fontSize:18 }}>{title}</span>
                </AppBar>
                {loading ? <Loader /> : (
                    <form style={{marginTop:40}} >
                    {fields.map((field)=>(
                        <div key={field.name}>
                        {(field.name === 'gifPath' || field.name === 'imagePath') ? (
                            <>
                            <Box
                            style={{marginLeft:100}}
                            component="img"
                            sx={{
                            height: 360,
                            width: 350,
                            }}
                            src={itemData[field.name]}
                            />
                            </>
                            ) : (
                            <div key={field.name}>
                                <Typography variant="subtitle1" style={{ marginTop: 15 ,color:"#F46609" ,marginBottom: 5 }}>
                                {field.label}:
                                </Typography>
                                <Typography variant="body1">{itemData[field.name]}</Typography>
                            </div>
                        )}
                        </div>
                    ))}
                    </form>
                )}
        </Box>
        </Modal>
    );
    };
    
    export default ShowItemModal;

    // <TextField
                            // style={{marginTop:15 , marginBottom:5}}
                            // //label={field.label}
                            // name={field.name}
                            // type={field.type}
                            // value={itemData[field.name]}
                            // fullWidth
                            // />