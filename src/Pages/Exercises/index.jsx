import React , {useState , useEffect} from 'react'
import { Container , Grid , Card , CardMedia , CardContent , Pagination , CardActions , Button , Typography  } from "@mui/material"
import { fetchDataList , deleteItemById , createDataItem } from "../../Core/API/Service/apiService"
import { exerciseFields , showExerciseFields } from './fields';
import ErrorModal from "../../Core/Components/Error/index"
import Loader from '../../Core/Components/Loader/Page-Loader';
import PageHeader from '../../Core/Components/Header/PageHeader'
import CreateItemModal from '../../Core/Components/Modal/createItem';
import EditItemModal from "../../Core/Components/Modal/editItem"
import ShowItemModal from '../../Core/Components/Modal/showItem';
import ConfirmationModal from '../../Core/Components/Modal/confirmAction';
import withGuards from '../../Core/Routes/withGuards.routes'
import AlertMessage from '../../Core/Components/Alert';
import Slider from '../../Core/Components/Slider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonHeader from '../../Core/Components/Header/ButtonHeader';

const ExercisesPage = () => {

  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [items , setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [showModalOpen, setShowModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const [successMessage, setSuccessMessage] = useState("")

  const handleOpenEditModal = (item) => {
    setSelectedItemId(item._id)
    setEditModalOpen(true)
  }

  const handleOpenShowModal = (item) => {
    setSelectedItemId(item._id)
    setShowModalOpen(true)
  }

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false)
  }

  const handleOpenConfirmationModal = (item) => {
    setItemToDelete(item)
    setConfirmationModalOpen(true)
  }

  useEffect(()=>{
    fetchDataList("admin/exercises").then((response)=>{
      setItems(response.data)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      setErrorMessage( error.message || error.response.data.error )
      setErrorModalOpen(true)
    })
  }, [])

  const handleConfirmDeletion = () => {
    if (itemToDelete) {
      deleteItemById('admin/exercises', itemToDelete._id)
        .then((response) => {
          console.log(response)
          fetchDataList("admin/exercises")
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

  const handleCreateExercise = (formData) => {

    const Dataform = new FormData();
    Dataform.append("name",formData.name)
    Dataform.append("category",formData.category)
    Dataform.append("ar_description",formData.ar_description)
    Dataform.append("en_description",formData.en_description)
    Dataform.append("gif",formData.image)

    createDataItem('admin/exercises', Dataform)
      .then((response) => {
        console.log(response);
        handleCloseCreateModal()
        console.log(formData)
      })
      .catch((error) => {
        console.error(error)
        handleCloseCreateModal()
        console.log(formData)
      })
  }

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const itemsToDisplay = items.slice(startIndex, endIndex)
  
  return (
    <>
      <PageHeader title={"Exercises"} />
      <ButtonHeader title={"Exercise"} func={handleOpenCreateModal} />

      {loading ? (<Loader />) : (
        <div><Slider title={"ali dasdasdasdasdasdase qwewqeqwe ammar"} />
      <Container style={{marginLeft:10}} maxWidth="lg">
        <Grid container spacing={5} style={{ marginLeft:-70 }} >
          {itemsToDisplay.map((exercise ,index)=>(
            <Grid item xs={12} sm={4} ms={4} key={index} >
              <Card style={{ boxShadow:"4px 4px 8px 5px rgb(182, 173, 187)" , borderRadius:20 , width:370 , height:555 , padding:"3px"}} >
                <CardMedia
                  component="img"
                  style={{width:"230" , height:"365px" }}
                  image={exercise.gifPath}
                />
                <CardContent>
                  <Typography style={{ matginTop:-40 , marginLeft:30 , color:"#F46609" ,height:"20px" }} gutterBottom variant="h5" component="div">
                    {exercise.name}
                  </Typography>
                  <Typography style={{marginTop:60 , alignItems:"center" , color:"#369AC4" ,  marginLeft:120 , height:"10px"  }} variant="body2" color="text.secondary">
                    {exercise.category}
                  </Typography>
                </CardContent>
                <CardActions style={{ marginTop:10 , marginLeft:60}}>        
                  <Button style={{color:"#3246A9"}} onClick={() => handleOpenEditModal(exercise) }><EditIcon /></Button>
                  <Button color="error" onClick={() => handleOpenConfirmationModal(exercise) }><DeleteIcon /></Button>
                  <Button style={{color:"#3246A9"}} onClick={()=> handleOpenShowModal(exercise) }><VisibilityIcon /></Button>
                </CardActions>
              </Card>
            </Grid>            
          ))}
        </Grid>

        <Pagination
            style={{display: 'flex', color:"#369AC4" ,  justifyContent: 'center', marginBottom:"10px" ,marginTop: '30px' }}
            count={Math.ceil(items.length / itemsPerPage)}
            page={currentPage}
            size="large"
            onChange={handlePageChange}
            />
      
      </Container>
      </div>
      )}
      
      <ConfirmationModal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} onConfirm={handleConfirmDeletion} item={itemToDelete} />
      <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} />
      <CreateItemModal open={createModalOpen} onClose={handleCloseCreateModal} onCreate={handleCreateExercise} title="Create New Exercise" fields={exerciseFields} />
      <EditItemModal open={editModalOpen} onClose={() => 
      { setEditModalOpen(false)
        setSelectedItemId(null) }} onUpdate={fetchDataList} resource="admin/exercises" title="Edit Exercise" fields={exerciseFields} itemId={selectedItemId} />

      <ShowItemModal open={showModalOpen} onClose={() => 
      { setShowModalOpen(false)
        setSelectedItemId(null) }} itemId={ selectedItemId } resource="admin/exercises" title={"Exercise Details"}  fields={ showExerciseFields } />
  </>
  )
}

export default withGuards(ExercisesPage)


      {/* <CreateExerciseModal open={createModalOpen} onClose={handleCloseCreateModal} onCreate={handleCreateExercise}/> */}


      // if (willDelete) {
      //   swal("Poof! Your imaginary file has been deleted!", {
      //     icon: "success",
      //   });
      // } else {
      //   swal("Your imaginary file is safe!");
      // }


//       import React from 'react'
// import swal from '@sweetalert/with-react'

// const onPick = value => {
//   swal("Thanks for your rating!", `You rated us ${value}/3`, "success")
// }

// const MoodButton = ({ rating, onClick }) => (
//   <button 
//     data-rating={rating}
//     className="mood-btn" 
//     onClick={() => onClick(rating)}
//   />
// )


// swal({
//   text: "How was your experience getting help with this issue?",
//   buttons: {
//     cancel: "Close",
//   },
//   content: (
//     <div>
//       <MoodButton 
//         rating={1} 
//         onClick={onPick}
//       />
//       <MoodButton 
//         rating={2} 
//         onClick={onPick}
//       />
//       <MoodButton 
//         rating={3} 
//         onClick={onPick}
//       />
//     </div>
//   )
// })