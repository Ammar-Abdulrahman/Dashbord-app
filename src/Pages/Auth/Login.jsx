import { react , useState } from 'react'
import { Avatar, Box, Button, FormControl ,Grid, Paper, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { boxStyle , avater , buttonStyle , gridStyle, paperStyle, imageStyle } from "../../Core/Theme/login.styled"
import { loginAction } from "../../Core/API/Authentication/authService"
import { emailRegex } from "../../Core/Constant/index"
import ValidatedTextField from "../../Core/Components/TextField/index"
import ErrorModal from "../../Core/Components/Error/index"
import Loader from "../../Core/Components/Loader/Page-Loader/index"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Core/API/Authentication/AuthContext'
import PersonIcon from '@mui/icons-material/Person'; 

const Login = () => {

  const { login } = useAuth();

  const [email,setEmail] = useState("");
	const [password,setPassword] = useState("")
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()


  const isEmailValid = (email) =>{
    return emailRegex.test(email)
  }

  const isPasswordValid = (password) =>{
    return password.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
          type: 0 ,
          email:email,
          password:password
        }

    if (isEmailValid(email) && isPasswordValid(password)) {
      setLoading(true)
      try {
        await loginAction('auth/login', data )
        .then((response)=>{
          const token = response.data.token;
          setLoading(false)
          login(token)
          navigate("/")
        })
      } catch (error) {
        setErrorMessage(error.response?.data?.error || 'An error occurred');
        setErrorModalOpen(true);
        setLoading(false)
      }
    }
  }

  return (
    <>
    <div style={{ height:"100%" , overflowX:"hidden" , overflowY:"hidden" ,marginTop:-8 , marginLeft:-8 , backgroundImage:"linear-gradient(to top,#3246A9 50%,#ECEFF1 50%)" , position:"absolute"  ,width:"100%" }} >
      <Grid sx={gridStyle}>
        <Paper elevation={12} style={paperStyle} >
        <img
        style={imageStyle}
        srcSet={`src/Core/assets/images/orang.png`}
        loading="lazy"
      />
        <Box  style={boxStyle}>
        <Grid align='center'>
          <Avatar style={avater}> <LockIcon /> </Avatar>
          <h1 style={{color:"#F46609"}} >Log in</h1>
        </Grid>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <ValidatedTextField
              style={{marginTop:30}}
              label="Email"
              name="email"
              value={email}
              onChange={setEmail}
              validation={isEmailValid}
              errorText="Invalid email address"
            />

            <ValidatedTextField
              style={{marginTop:20}}
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              validation={isPasswordValid}
              errorText="Password must be at least 6 characters"
            />

            <Button type="submit" variant="contained" style={buttonStyle}>
              Submit
            </Button>
          </FormControl>
        </form>
        {loading ? (<Loader /> ): ("") }
      </Box>
      </Paper>
    </Grid>
    </div>  
      <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} />
    </>
  )
}

export default Login

//, backgroundImage:"linear-gradient(to top,rgb(155, 64, 216),rgb(118, 14, 184),rgb(183, 24, 214),rgb(200, 8, 238),rgb(238, 8, 188),rgb(221, 21, 178),violet)"


{/* <div>
            <div style={{ bottom: 190 ,left: 550 ,position: "absolute",width: "20px",
              height: "20px",
              backgroundImage: "linear-gradient(#3246A9,#369AC4)",
              borderRadius: "40px"
            }} />
            <div style={{ bottom: 190 ,left: 750 ,position: "absolute",width: "20px",
              height: "20px",
              backgroundImage: "linear-gradient(#3246A9,#369AC4)",
              borderRadius: "40px"
            }} />
            <div style={{ bottom: 190 ,left: 1050 ,position: "absolute",width: "20px",
              height: "20px",
              backgroundImage: "linear-gradient(#3246A9,#369AC4)",
              borderRadius: "40px"
            }} />
            <div style={{ bottom: 170 ,left: 950 ,position: "absolute",width: "20px",
              height: "20px",
              backgroundImage: "linear-gradient(#3246A9,#369AC4)",
              borderRadius: "40px"
            }} />
          </div> */}

{/* <div class="design">
            <div class="pill-1 rotate-45"></div>
            <div class="pill-2 rotate-45"></div>
            <div class="pill-3 rotate-45"></div>
            <div class="pill-4 rotate-45"></div>
        </div> */}


// .design .pill-1 {
//   bottom: 0;
//   left: -40px;
//   position: absolute;
//   width: 80px;
//   height: 200px;
//   background: linear-gradient(#ff966d, #fa538d, #89379c);
//   border-radius: 40px;
// }

// .design .pill-2 {
//   top: -100px;
//   left: -80px;
//   position: absolute;
//   height: 450px;
//   width: 220px;
//   background: linear-gradient(#ff966d, #fa538d, #89379c);
//   border-radius: 200px;
//   border: 30px solid #e2c5e2;
// }

// .design .pill-3 {
//   top: -100px;
//   left: 160px;
//   position: absolute;
//   height: 200px;
//   width: 100px;
//   background: linear-gradient(#ff966d, #fa538d, #89379c);
//   border-radius: 70px;
// }

// .design .pill-4 {
//   bottom: -180px;
//   left: 220px;
//   position: absolute;
//   height: 300px;
//   width: 120px;
//   background: linear-gradient(#ff966d, #fa538d);
//   border-radius: 70px;
// }