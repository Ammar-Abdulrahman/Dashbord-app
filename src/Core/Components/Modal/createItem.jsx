import React , { useState } from 'react'
import { Modal , Backdrop , Box , Button , TextField , Typography , InputLabel , Input } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Loader from '../Loader/App-Loader'
import { modalStyle } from '../../Theme/modal.style'

const CreateItemModal = ({open, onClose, onCreate , title, fields }) => {

        const [loading , setLoading] = useState(false)
        const [formData, setFormData] = useState(
          fields.reduce((acc,field)=>({...acc,[field.name]:''}),{})
        )

        const handleFormChange = (e) => {
          const { name, value } = e.target
          setFormData({ ...formData, [name]: value })
        }
      
        const handleImageChange = (e) => {
          const file = e.target.files[0]
          setFormData({ ...formData, image: file })
        }
      
        const handleCreate = () => {
          onCreate(formData)
          setLoading(true)
        }

        const handleClose = () => {
          setFormData(fields.reduce((acc,field)=>({...acc,[field.name]:''}),{}))
          onClose()
          setLoading(false)
        }

      return (
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="flex-end" >
              <Button onClick={handleClose} style={{color:"#F46609"}} aria-label='close' >
                <CloseIcon /> 
              </Button>
            </Box>
                <Typography style={{color:"#3E51FA"}} id="keep-mounted-modal-title" variant="h6">
                    {title}
                </Typography>
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
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleFormChange}
                        fullWidth
                        />
                      )}
                    </div>
                  ))}
                  <Button style={{marginTop:45 , backgroundColor:"#3E51FA" ,  marginLeft:170 }} 
                  variant="contained"
                  onClick={handleCreate}
                  >
                    Create
                  </Button>
                </form>
                  <Button style={{marginTop:-61 , marginLeft:270}} onClick={handleClose} variant="contained" color="error">
                    Cancel
                  </Button>
                  { loading ? <Loader /> : ""}
          </Box>
        </Modal>
      );
}

export default CreateItemModal


// import React , { useState } from 'react';
// import { Modal , Backdrop , Box , Button , TextField , Typography , InputLabel , Input } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius:5
// };

// const CreateItemModal = ({open, onClose, onCreate , title, fields }) => {

//         const initialFormData = {}

//         fields.forEach((field)=>{
//           initialFormData[field.name] = field.type === 'file' ? null : ''
//         })
//         const [formData, setFormData] = useState(initialFormData)

//         const handleFormChange = (e) => {
//           const { name, value } = e.target;
//           setFormData({ ...formData, [name]: value })
//         }
      
//         const handleImageChange = (e) => {
//           const file = e.target.files[0];
//           setFormData({ ...formData, [e.target.name]: file })
//         }
      
//         const handleCreate = () => {
//           onCreate(formData)
//           setFormData({
//             name:"",
//             en_description:"",
//             ar_description:"",
//             category:"",
//             gif:null
//           })
//           handleClose()
//         }

//         const handleClose = () => {
//           setFormData(initialFormData)
//           onClose();
//         }

//       return (
//         <Modal
//         keepMounted
//         open={open}
//         onClose={onClose}
//         aria-labelledby="keep-mounted-modal-title"
//         aria-describedby="keep-mounted-modal-description"
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//             timeout: 500,
//         }}>
//             <Box sx={style}>
//             <Box display="flex" justifyContent="flex-end" >
//               <Button onClick={onClose} color="secondary" aria-label='close' >
//                 <CloseIcon /> 
//               </Button>
//             </Box>
//                 <Typography id="keep-mounted-modal-title" variant="h6">
//                     {title}
//                 </Typography>
//                 <form>
//                   {fields.map((field)=>(
//                     <div key={field.name}>
//                       {field.type === 'file' ? (
//                         <>
//                           <InputLabel>{field.label}</InputLabel>
//                           <Input 
//                           id={field.name+'-upload'}
//                           type="file"
//                           onChange={handleImageChange}
//                           fullWidth
//                           />
//                           </>
//                       ) : (
//                         <TextField 
//                         style={{marginTop:15 , marginBottom:5}}
//                         label={field.label}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleFormChange}
//                         fullWidth
//                         />
//                       )}
//                     </div>
//                   ))}
//                   <Button style={{marginTop:45 , marginLeft:170 }} 
//                   variant="contained"
//                   color='secondary'
//                   onClick={handleCreate}
//                   >
//                     Create
//                   </Button>
//                 </form>
//                   <Button style={{marginTop:-61 , marginLeft:270}} onClick={onClose} variant="contained" color="error">
//                     Cancel
//                   </Button>
//             </Box>
//         </Modal>
//       );
// }

// export default CreateItemModal