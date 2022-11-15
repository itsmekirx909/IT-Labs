import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupstud } from "./configs/fbase/fbasemethods"

export default function Studsigncomp(props){
    let navigate = useNavigate()
    let [invalid, setinvalid] = useState()
    let myref = props.myref
    let [email, setemail] = useState()
    let [pw, setpw] = useState()
    let [pw2, setpw2] = useState()

function signup(){
    if(email && pw && pw2){

        if(pw === pw2){
            signupstud(email, pw, myref)
            .then((success)=>{
               navigate('/')
            })
            .catch((error)=>{
                setinvalid(error)
                setTimeout(()=>{
                    setinvalid('')
                }, 4000)     
            })

        }else{
            setinvalid('Passwords must be same')
            setTimeout(()=>{
                setinvalid('')
            }, 4000) 
        }

    }else{
        setinvalid('Fill all fields first')
        setTimeout(()=>{
            setinvalid('')
        }, 4000) 
    }
}

    return(
        <>

        <TextField type='email' onChange={(x)=>{setemail(x.target.value)}} sx={{margin: '10px'}} color='success' label="Enter Email" variant="outlined" />
       
        <TextField type='password' onChange={(x)=>{setpw(x.target.value)}} sx={{margin: '10px'}} color='success' label="Enter Password" variant="outlined" />
       
        <TextField type='password' onChange={(x)=>{setpw2(x.target.value)}} sx={{margin: '10px'}} color='success' label="Confirm Password" variant="outlined" />
        
        <Button onClick={signup} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '20px'}}>Sign Up</Button>

        <Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>

        </>
    )
}