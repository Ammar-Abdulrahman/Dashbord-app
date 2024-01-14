import React , {useState , useEffect} from 'react'
import { Container , Grid , Card , CardMedia , CardContent , CardActions , Button , Typography  } from "@mui/material"
import { fetchDataList , deleteItemById , createDataItem } from "../../Core/API/Service/apiService"
import ErrorModal from "../../Core/Components/Error/index"
import Loader from '../../Core/Components/Loader/Page-Loader'
import PageHeader from '../../Core/Components/Header/PageHeader'
import ConfirmationModal from '../../Core/Components/Modal/confirmAction'
import withGuards from '../../Core/Routes/withGuards.routes'
import DeleteIcon from '@mui/icons-material/Delete'
import ButtonHeader from '../../Core/Components/Header/ButtonHeader'
import AddDayForm from '../../Core/Components/Modal/AddDayForm'
import Slider from '../../Core/Components/Slider'

const DaysPage = () => {

  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [items , setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const [fieldsToAdd, setFieldsToAdd] = useState([])
  const [createModalOpen , setCreateModalOpen] = useState(false)
  const [dayName, setDayName] = useState('')

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true)
  }

  const handleOpenConfirmationModal = (item) => {
    setItemToDelete(item)
    setConfirmationModalOpen(true)
  }

  useEffect(()=>{
    fetchDataList("admin/plans/days").then((response)=>{
      setItems(response.data)
      console.log(response.data)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      setErrorMessage( error.message || error.response.data.error )
      setErrorModalOpen(true)
    })
  },[])

  const handleConfirmDeletion = () => {
    if (itemToDelete) {
      deleteItemById('admin/plans/day', itemToDelete._id)
        .then((response) => {
          console.log(response)
          fetchDataList("admin/plans/days")
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage( error.message || error.response.data.error )
          setErrorModalOpen(true)
        })
        .finally(() => {
          setItemToDelete(null);
          setConfirmationModalOpen(false);
        })
    }
  }

  const handleCreateDay = () => {

    // Send dayName and fieldsToAdd to the backend using axios or your API service function
    // Close the modal and clear the fieldsToAdd array
    setCreateModalOpen(false);
    setFieldsToAdd([]);
    setDayName(''); // Clear dayName
  };

  const handleAddField = (fields) => {
    // Add fields to the fieldsToAdd state
    setFieldsToAdd(fields);
  }

  const handleCreateExercise = (formData) => {

    createDataItem('admin/plans/day', formData)
      .then((response) => {
        console.log(response);
        setCreateModalOpen(false)
        console.log(formData)
        setDayName("")
      })
      .catch((error) => {
        console.error(error)
        console.log(formData)
        setCreateModalOpen(false);
        setFieldsToAdd([]);
        setDayName(''); // Clear dayName
      })
  }


  return (
    <>
    <PageHeader title={"Days"} />
      <ButtonHeader title={"Add Day"} func={handleOpenCreateModal} />

      {loading ? (<Loader />) : (
      <Container style={{marginLeft:10}} maxWidth="lg">
        <Grid container spacing={5} style={{ marginLeft:-70 , marginTop : "20px" }} >
          {items.map((day ,index)=>(
            <Grid style={{ height:"550px" , width:"1800px"}}  item xs={12} sm={7} ms={8} key={index} >
              <Card style={{ display:"flex" , margin:20 , position:"inherit" ,borderRadius:10 , backgroundImage:"linear-gradient(to top,rgb(155, 64, 216),rgb(118, 14, 184),rgb(183, 24, 214),rgb(200, 8, 238),rgb(238, 8, 188),rgb(221, 21, 178),violet)" , padding:"3px"}} >
                <CardContent>
                  <Typography style={{ matginTop:-20 , marginLeft:110 , height:"25px" }} gutterBottom variant="h5" component="div">
                    {day.title}
                  </Typography>
                </CardContent>
                {day.exercises.map((exer,index)=>(
                  <Grid item xs={12} sm={6} ms={4} key={index} >
                    <Card style={{ boxShadow:"4px 4px 8px 5px rgb(182, 173, 187)" , borderRadius:20  , padding:"3px"}} >
                      <CardMedia
                      component="img"
                      style={{width:"230" , height:"365px" }}
                      image={exer.exerciseId.gifPath}
                    />
                      <CardContent>
                        <Typography style={{ matginTop:-40 , marginLeft:30 , height:"20px" }} gutterBottom variant="h5" component="div">
                          {index+1}- {exer.exerciseId.name}
                        </Typography>
                        <Typography style={{marginTop:60 , alignItems:"center" , marginLeft:120 , height:"10px"  }} variant="body2" color="text.secondary">
                          Rest: {exer.rest}<span style={{color:"blueviolet"}} >s</span> / Duration: {exer.duration}<span style={{color:"blueviolet"}} >s</span>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <CardActions style={{ marginTop:10 , marginLeft:70}}>        
                  <Button style={{borderRadius:6 , justifyContent:"center" , alignItems:"center" }} onClick={()=> handleOpenConfirmationModal(day) } variant="contained" color="error">
                    <DeleteIcon style={{marginTop:-1 , marginLeft:-7 , marginRight:2}} /> Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>            
          ))}
        </Grid>
      
      </Container>
      )}

      <Slider title={"ammar"} /> 

      <ConfirmationModal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} onConfirm={handleConfirmDeletion} item={itemToDelete} />
      <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} />
    
      <AddDayForm open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </>
  )
}

export default withGuards(DaysPage)


{/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl> */}



// 2. In your parent component (e.g., DaysPage.js), handle the deletion of fields and data submission as follows:

// `jsx
// import React, { useState } from 'react';
// // ... (other imports)

// const DaysPage = () => {
//   // ... (other state variables)

//   const [fieldsToAdd, setFieldsToAdd] = useState([]);
//   const [dayName, setDayName] = useState(''); // Add day name state

//   // ... (other functions)

// Ammar Abdulrahman, [10/20/2023 10:06 AM]
// const handleCreateDay = () => {
//     // Send dayName and fieldsToAdd to the backend using axios or your API service function
//     // Close the modal and clear the fieldsToAdd array
//     setCreateModalOpen(false);
//     setFieldsToAdd([]);
//     setDayName(''); // Clear dayName
//   };

//   const handleAddField = (fields) => {
//     // Add fields to the fieldsToAdd state
//     setFieldsToAdd(fields);
//   };

//   return (
//     <>
//       <PageHeader title={'Days'} />
//       <ButtonHeader title={'Add Day'} func={handleOpenCreateModal} />

//       {/* ... Other content ... */}

//       <ConfirmationModal
//         open={confirmationModalOpen}
//         onClose={() => setConfirmationModalOpen(false)}
//         onConfirm={handleConfirmDeletion}
//         item={itemToDelete}
//       />
//       <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} />

//       <AddDayForm open={createModalOpen} onClose={() => setCreateModalOpen(false)} onAddDay={handleAddField} />

//       {fieldsToAdd.map((field, index) => (
//         <div key={index}>
//           {field.name}: Duration - {field.duration}, Rest - {field.rest}, Exercise Name - {field.exerciseName}
//           <Button variant="contained" color="error" onClick={() => handleDeleteField(index)}>
//             Delete
//           </Button>
//         </div>
//       )}
//     </>
//   );
// };

// export default withGuards(DaysPage);
// `

// With these changes, the deletion of fields is now handled within the `AddDayForm` component, and you pass the data to be added to the parent component, where it is stored and can be submitted together with the day name.