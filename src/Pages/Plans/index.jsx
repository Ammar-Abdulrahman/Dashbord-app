import React , {useState , useEffect} from 'react'
import { Container , Grid , Card , CardMedia , CardContent , CardActions , Button , Typography  } from "@mui/material"
import { fetchDataList , deleteItemById , createDataItem } from "../../Core/API/Service/apiService"
import { planFields } from './fields';
import ErrorModal from "../../Core/Components/Error/index"
import Loader from '../../Core/Components/Loader/Page-Loader';
import PageHeader from '../../Core/Components/Header/PageHeader'
import CreateItemModal from '../../Core/Components/Modal/createItem';
import EditItemModal from "../../Core/Components/Modal/editItem"
import ShowItemModal from '../../Core/Components/Modal/showItem';
import ConfirmationModal from '../../Core/Components/Modal/confirmAction';
import withGuards from '../../Core/Routes/withGuards.routes'
import Slider from '../../Core/Components/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonHeader from '../../Core/Components/Header/ButtonHeader';

const PlansPage = () => {

  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [items , setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleOpenCreateModal = () => {
      setCreateModalOpen(true);
    }

    const handleCloseCreateModal = () => {
      setCreateModalOpen(false);
    }

  const handleOpenConfirmationModal = (item) => {
    setItemToDelete(item);
    setConfirmationModalOpen(true);
  }

  useEffect(()=>{
    fetchDataList("admin/plans").then((response)=>{
      setItems(response.data)
      setLoading(false)
      console.log(response);
  
    }).catch((error)=>{
      console.log(error.message);
      console.log(error.response.data?.error);
      setLoading(false)
      setErrorMessage( error.message || error.response.data.error )
      setErrorModalOpen(true)
    })
  }, [])

  const handleConfirmDeletion = () => {
    if (itemToDelete) {
      deleteItemById('admin/plans', itemToDelete._id)
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
        })
    }
  }

  const handleCreatePlan = (formData) => {

    createDataItem('admin/plans', formData)
      .then((response) => {
        console.log(response);
        handleCloseCreateModal()
      })
      .catch((error) => {
        console.error(error)
        handleCloseCreateModal()
      })
  }
  
  return (
    <>
      <PageHeader title={"Plans"} />
      <ButtonHeader title={"Plan"} func={handleOpenCreateModal} />

      {loading ? (<Loader />) : (
        
      <Container style={{marginLeft:15}} maxWidth="lg" >
        <Grid container spacing={5} style={{ marginLeft:-70 , marginTop : "10px" }} >
          {items.map((plan ,index)=>(
            <Grid item xs={12} sm={4} ms={4} key={index} >
              <Card style={{ boxShadow:"4px 4px 8px 5px rgb(182, 173, 187)" , borderRadius:20 , width:350 , height:260 , padding:"3px"}} >
                <CardContent>
                  <Typography style={{ matginTop:-40 , marginLeft:100 , height:"20px" }} gutterBottom variant="h5" component="div">
                    {plan.title}
                  </Typography>
                  <Typography style={{marginTop:35 , alignItems:"center" , marginLeft:90 , height:"10px"  }} variant="h6" color="text.secondary">
                    Gender : {plan.gender}
                  </Typography>
                  <Typography style={{marginTop:50 , alignItems:"center" , marginLeft:120 , height:"10px"  }} variant="h6" color="text.secondary">
                    BMI : {plan.BMI}
                  </Typography>
                </CardContent>
                <CardActions style={{ marginTop:20 , marginLeft:60}}>  
                  <Button style={{marginLeft:45}} color="error" onClick={() => handleOpenConfirmationModal(plan) } variant="contained">
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
      <CreateItemModal open={createModalOpen} onClose={handleCloseCreateModal} onCreate={handleCreatePlan} title="Create New Plan" fields={planFields} />
  </>
  )
}

export default withGuards(PlansPage)