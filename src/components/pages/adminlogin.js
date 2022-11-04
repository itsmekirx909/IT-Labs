import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../configs/fbase/fbasemethods";
import Navbar from "../navbar";

export default function Adminlogin(){
    let [em, setem] = useState('')
    let [paw, setpaw] = useState('')
    let navigate = useNavigate()
    let [invalid, setinvalid] = useState('')
    let [loader, setloader] = useState(false)
    
        function email(e){
        setem(e.target.value)
        }
        
        function pw(e){
            setpaw(e.target.value)
        }


    function loginuser(){
setloader(true)

        login(em,paw)
        .then((success)=>{
            setloader(false)
navigate(`/${success.uid}`, 
{state: {
    avatar: success.avatar
}}
)
        })
        .catch((error)=>{
            setloader(false)
                setinvalid('Invalid Email or Password')
                setTimeout(() => {
                    setinvalid('')
                }, 4000)
        })
            }


    return(
        <>

<div className="reg">

        <Box sx={{border: '2px solid rgba(0, 128, 0, 1)', borderRadius: '10px', width: '30vw', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContents: 'center', alignItems: 'center', padding: '30px'}}>

<Button color="success" onClick={()=>{navigate('/')}}>Back to Homepage</Button>

        <Typography variant="h4" sx={{fontWeight: 'bolder', margin: '20px auto', width: 'fit-content', color: 'rgba(0, 128, 0, 1)'}}>
                Admin Login
            </Typography>

        <TextField onChange={(x)=>{email(x)}} sx={{margin: '10px'}} color='success' label="Email" variant="outlined" />

        <TextField onChange={(x)=>{pw(x)}} sx={{margin: '10px'}} color='success' label="Password" type='password' variant="outlined" />
{loader?
        <CircularProgress color="success"/>
:
        <Button onClick={loginuser} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '20px'}}>Login</Button>
}



        <Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>


            </Box>

</div>
        
        </>
    )
}