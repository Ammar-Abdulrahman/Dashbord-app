import React, { useState , useEffect } from 'react';
import { Modal, Backdrop, Box, Button, Typography, TextField , FormControl , Select , InputLabel , MenuItem  } from '@mui/material';
import { modalDayStyle } from '../../Theme/modal.style';
import { fetchDataList , createDataItem } from '../../API/Service/apiService';
import Loader from '../Loader/Page-Loader';
import CloseIcon from '@mui/icons-material/Close'


const AddDayForm = ({ open, onClose}) => {

    const [formData, setFormData] = useState({ title: '', duration: '', rest: '', exerciseName: '' })
    const [fields, setFields] = useState([])
    const [loading,setLoading] = useState(true)

    const [title,setTitle] = useState("")
    const [exercises,setExercises] = useState([])

    const [inputFields,setInputFields] = useState([
        {exerciseId: '' ,duration: '', rest: ''}
    ])

    const handleChangeInput = (index,event)=>{
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleAddFieldData = () => {
        let newfield = {exerciseId: '' , rest: '', duration : ''};
        setInputFields([...inputFields, newfield]);
    }

    const handleRemoveFieldData = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    useEffect(()=>{
        fetchDataList("admin/exercises").then((response)=>{
        setExercises(response.data)
        setLoading(false)
        }).catch((error)=>{
        setLoading(false)
        })
    }, [])

    const handleFieldChange = (e, fieldName) => {
    const value = e.target.value
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }))
    }

    const handleAddField = () => {
    const newField = { ...formData };
    setFields((prevFields) => [...prevFields, newField])
    setFormData({ title: '', duration: '', rest: '', exerciseName: '' })
    }

    const handleDeleteField = (index) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setFields(updatedFields)
    onDeleteField(updatedFields)
    }

    const handleSubmit = () => {

            createDataItem('admin/plans/day', {"exercises":inputFields,"title":title} )
            .then((response) => {
                console.log(response)
                handleClose()
            })
            .catch((error) => {
                console.error(error)
                handleClose()
            })

    }

    const handleClose = () => {
        onClose()
        setLoading(false)
    }

return (
    <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby="add-day-title"
    aria-describedby="add-day-description"
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout: 500,
    }}
    >
        <Box sx={modalDayStyle}>
            <Box display="flex" justifyContent="flex-end" >
                <Button onClick={handleClose} style={{color:"#F46609"}} aria-label='close' >
                    <CloseIcon /> 
                </Button>
            </Box>
            <Typography style={{color:"#3E51FA"}} variant="h6" component="h2" id="add-day-title">
                Add a Day
            </Typography>
            <form>

            <TextField
                label="Day Title"
                style={{marginTop:15 , width:280 , marginLeft:160 , marginBottom:5}}
                onChange={(e)=>setTitle(e.target.value)}  
            />
            { 
                        <div style={{ position:"fixed" }} >
                            <Button variant="contained" style={{marginTop:-85 ,  backgroundColor:"#F46609" ,  marginLeft:555 }} onClick={handleAddFieldData} >Add</Button> 
                        </div> 
            }
                {inputFields.map((inputField,index)=>(
                    <div key={index}>

            <FormControl style={{ width:210 , marginLeft:5 , marginRight:5 , marginTop:15 }} >
                <InputLabel  id="demo-simple-select-label">Exercise</InputLabel>
                    <Select
                        label="Exercise"
                        onChange={event => handleChangeInput(index,event)}
                    >
                        {exercises.map((exercise) => (
                            <MenuItem name="exerciseId" key={exercise._id} value={exercise._id}>{loading ? (<Loader /> ) : ( exercise.name )}</MenuItem>
                        ))}
                    </Select>
            </FormControl>

            <TextField
                style={{width:150 , marginTop:15 , marginLeft:5 , marginRight:5 }}
                label="Duration"
                name="duration"
                type="number"
                value={inputField.duration} 
                onChange={event => handleChangeInput(index,event)}
            />
            <TextField
                style={{width:150 ,marginTop:15 ,  marginLeft:5 , marginRight:5 }}
                label="Rest"
                name="rest"
                type="number"
                value={inputField.rest} 
                onChange={event => handleChangeInput(index,event)}
            />
            {   inputFields.length!==1 &&
                <Button style={{marginTop:25 ,  marginLeft:5 , marginRight:5 }} variant="contained" color='error' onClick={() => handleRemoveFieldData(index)} >Delete</Button> }
            </div>
            ))}
            <Button style={{marginTop:20 , backgroundColor:"#3E51FA" ,  marginLeft:260 }} 
                variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            </form>
        </Box>
    </Modal>
)
}

export default AddDayForm;