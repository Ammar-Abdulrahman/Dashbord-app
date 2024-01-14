import React , {useState} from 'react'
import { Container , Grid , Stack , Card , CardMedia , CardContent , Pagination  , CardActions , Button , Typography  } from "@mui/material"
import { fetchDataList , createDataItem , deleteItemById } from "../../Core/API/Service/apiService"
import ErrorModal from "../../Core/Components/Error/index"
import Loader from '../../Core/Components/Loader/Page-Loader';
import withGuards from '../../Core/Routes/withGuards.routes'
import PageHeader from '../../Core/Components/Header/PageHeader'
import ConfirmationModal from '../../Core/Components/Modal/confirmAction';
import EditItemModal from "../../Core/Components/Modal/editItem"
import ShowItemModal from '../../Core/Components/Modal/showItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateItemModal from '../../Core/Components/Modal/createItem';
import { foodFields , showFoodFields } from './fields';
import ButtonHeader from '../../Core/Components/Header/ButtonHeader';
import Slider from '../../Core/Components/Slider';

const FoodPage = () => {

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

  const handleOpenEditModal = (item) => {
    setSelectedItemId(item._id);
    setEditModalOpen(true);
  }

  const handleOpenShowModal = (item) => {
    setSelectedItemId(item._id);
    setShowModalOpen(true);
  }

    const handleOpenCreateModal = () => {
      setCreateModalOpen(true);
    }

    const handleCloseCreateModal = () => {
      setCreateModalOpen(false);
    }

  const handleOpenConfirmationModal = (item) => {
    setItemToDelete(item);
    setConfirmationModalOpen(true);
  };

  fetchDataList("admin/food").then((response)=>{
    setItems(response.data)
    setLoading(false)
  }).catch((error)=>{
    setLoading(false)
    setErrorMessage( error.message || error.response.data.error )
    setErrorModalOpen(true)
  })

  const handleConfirmDeletion = () => {
    if (itemToDelete) {
      deleteItemById('admin/food', itemToDelete._id)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage( error.message || error.response.data.error )
          setErrorModalOpen(true)
        })
        .finally(() => {
          setItemToDelete(null);
          setConfirmationModalOpen(false);
        });
    }
  }


  const handleCreateFood = (formData) => {

    const Dataform = new FormData();
    Dataform.append("name",formData.name)
    Dataform.append("category",formData.category)
    Dataform.append("calories",formData.calories)
    Dataform.append("ar_name",formData.ar_name)
    Dataform.append("image",formData.image)
    Dataform.append("amount",formData.amount)

    createDataItem('admin/food', Dataform)
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
      <PageHeader title={"Food"} />
      <ButtonHeader title={"Food"} func={handleOpenCreateModal} />

      {loading ? (<Loader />) : (
      <Container style={{marginLeft:10}} maxWidth="lg" >
        <Grid container spacing={5} style={{marginLeft:-70 }}>
          {itemsToDisplay.map((food ,index)=>(
            <Grid item xs={12} sm={4} ms={4} key={index} >
              <Card style={{borderRadius:20 , boxShadow:"4px 4px 8px 5px rgb(182, 173, 187)" , width:"370px" , height:"400px" , padding:"3px"}} >
                <CardMedia
                  component="img"
                  style={{height:"250px", marginLeft:40 ,width:"270px"}}
                  image={food.imagePath}
                />
                <CardContent>
                  <Typography style={{ marginLeft:112 , color:"#F46609" }} gutterBottom variant="h5" component="div">
                    {food.name}
                  </Typography>
                  <Typography style={{ marginLeft:114 , color:"#369AC4" ,justifyContent:"center" , alignContent:"center" }} variant="body2" color="text.secondary">
                    {food.category}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent:"center" }} >        
                  <Button style={{color:"#3246A9"}} onClick={() => handleOpenEditModal(food) } ><EditIcon /></Button>
                  <Button color="error" onClick={() => handleOpenConfirmationModal(food) } ><DeleteIcon /></Button>
                  <Button style={{color:"#3246A9"}} onClick={() => handleOpenShowModal(food) } ><VisibilityIcon /></Button>
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
      
      )}

        <Slider title={"ammar"} /> 

      <ConfirmationModal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} onConfirm={handleConfirmDeletion} item={itemToDelete}/>
      {/* <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} /> */}
      <CreateItemModal open={createModalOpen} onClose={handleCloseCreateModal} onCreate={handleCreateFood} title="Create New Food" fields={foodFields} />
      <EditItemModal open={editModalOpen} onClose={() => 
      { setEditModalOpen(false)
        setSelectedItemId(null) }} onUpdate={fetchDataList} resource="admin/food" title="Edit Food" fields={foodFields} itemId={selectedItemId} />

      <ShowItemModal open={showModalOpen} onClose={() => 
      { setShowModalOpen(false)
        setSelectedItemId(null) }} itemId={ selectedItemId } resource="admin/food" title={"Food Details"}  fields={ showFoodFields } />
    </>
  )
}

export default withGuards(FoodPage)
