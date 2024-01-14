import React from 'react'
import {Grid , Stack , Card , CardContent , Typography } from "@mui/material"

const Slider = ({title}) => {
return (
    <> 
        <Grid item xs={4}>
            <Stack spacing={2} >
                <Card style={{ position:"absolute", marginLeft:1200 , marginTop:-95 , borderRadius:5 , boxShadow:"2px 2px 2px 2px rgb(182, 173, 187)" }} sx={{ maxWidth: 375 , height:650 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Grid>
    </>
)
}
export default Slider
