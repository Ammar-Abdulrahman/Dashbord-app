import React, { useState, useEffect } from "react";
import { Modal,Backdrop,Box,Button , Input , InputLabel ,TextField,Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { editDataItem,fetchDataItemById} from "../../API/Service/apiService";
import Loader from "../Loader/Page-Loader";
import { modalStyle } from "../../Theme/modal.style";

    const EditItemModal = ({ open, onClose, onUpdate, title, resource ,fields, itemId }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({})

    useEffect(() => {
    if (open && itemId && resource ) {
        setLoading(true);
        fetchDataItemById(resource, itemId)
        .then((response) => {
            setFormData(response.data)
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        })
        }
    }, [open, itemId , resource])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file })
    }

    const handleUpdate = () => {
        editDataItem( resource, itemId, formData)
        .then((response) => {
            console.log(response)
            console.log(formData)
            onUpdate();
            onClose();
        })
        .catch((error) => {
            console.error(error)
            onClose()
        });
    }

    const handleClose = () => {
        setFormData({})
        onClose()
    }

    return (
    <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby="edit-modal-title"
    aria-describedby="edit-modal-description"
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
    timeout: 500,
    }}>
    <Box sx={modalStyle}>
        <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} style={{color:"#F46609"}} aria-label="close">
                <CloseIcon />
            </Button>
        </Box>
        <Typography style={{color:"#3E51FA"}} id="edit-modal-title" variant="h6">
            {title}
        </Typography>
        {loading ? <Loader /> : (
            <form>
            {fields.map((field)=>(
                <div key={field.name}>
                {(field.name === 'gif' || field.name === 'image') ? (
                    <>
                    <InputLabel>{field.label}</InputLabel>
                    <Input 
                    id={field.name+'-upload'}
                    type={field.type}
                    onChange={handleImageChange}
                    fullWidth
                    />
                    </>
                    ) : (
                    <TextField 
                    style={{marginTop:15 , marginBottom:5}}
                    //label={field.label}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleFormChange}
                    fullWidth
                    />
                    )}
                </div>
            ))}
            
            <Button style={{marginTop:45 , backgroundColor:"#F46609" , marginLeft:170 }} variant="contained" onClick={handleUpdate}>
                Update
            </Button>

            <Button style={{marginTop:45 , marginLeft:10 }} variant="contained" color='error' onClick={handleClose}>
                Cancel
            </Button>
            </form>
            )}
    </Box>
    </Modal>
    );
};

export default EditItemModal;


{/* <form>
            {fields.map((field) => (
            <div key={field.name}>
                <TextField
                style={{ marginTop: 15, marginBottom: 5 }}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleFormChange}
                fullWidth
                />
            </div>
            ))}
            <Button
            style={{ marginTop: 45, marginLeft: 170 }}
            variant="contained"
            color="secondary"
            onClick={handleUpdate}
            >
            Update
            </Button>
            </form> */}