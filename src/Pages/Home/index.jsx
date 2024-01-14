import React , {useEffect , useState} from 'react'
import { Box, Grid , Card , CardContent , Typography, Stack } from '@mui/material'
import PageHeader from '../../Core/Components/Header/PageHeader'
import withGuards from "../../Core/Routes/withGuards.routes"
import { fetchDataList } from '../../Core/API/Service/apiService'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import GroupIcon from '@mui/icons-material/Group';

const HomePage =  () => {

  const [data,setData] = useState({})

  useEffect(()=>{
    fetchDataList("admin/home/statistics").then((response)=>{
      setData(response.data)
      console.log(response)
      //setLoading(false)
    }).catch((error)=>{
      //setLoading(false)
      console.log(error)
      //setErrorMessage( error.message || error.response.data.error )
      //setErrorModalOpen(true)
    })
  }, [])
  
  return (
    
    <div>
      <PageHeader title={"Home"} />
      <Box height={70} >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2} direction="row" >
            <Card sx={{ maxWidth: 49 + "%" , height: 140 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <GroupIcon /> {data.users}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ maxWidth: 49 + "%" , height: 140 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  <FastfoodIcon /> {data.foods}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Stack>

        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <EventIcon />
                  </Typography>
                  <Typography gutterBottom variant='h6' >
                    {data.exercises}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <NextPlanIcon />
                  </Typography>
                  <Typography gutterBottom variant='h6' >
                    {data.plans}
                  </Typography>
                </CardContent>
              </Card>
          </Stack>

        </Grid>
      </Grid>

    </Box>

    </div>
  )
}

export default withGuards(HomePage)