import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getrolldata } from "../configs/fbase/fbasemethods";
import Studsigncomp from "../studsigncomp";

export default function Studentsignup(){
    let navigate = useNavigate()
    let [roll, setroll] = useState()
    let [rollref, setrollref] = useState()
    let [email, setemail] = useState()
    let [pw, setpw] = useState()
    let [pw2, setpw2] = useState()
    let [invalid, setinvalid] = useState()

    function signup(){
        if(roll){
        getrolldata()
        .then((data)=>{


                let val = Object.values(data).filter((e)=>{
                    return  e.rollno == roll && e.approved
              })

              if(val[0].credentials !== undefined){
                setinvalid('Already Signed Up')
                setTimeout(()=>{
                    setinvalid('')
                }, 4000) 
              }else if(val.length === 1){
                setrollref(val[0].id)
              }else{
                setinvalid('Invalid Roll No.')
                setTimeout(()=>{
                    setinvalid('')
                }, 4000) 
              }

        })
        .catch(()=>{
            setinvalid('Error Fetching Data')
            setTimeout(()=>{
                setinvalid('')
            })
        }, 4000)

    }else{
        setinvalid('Enter Roll No. First')
        setTimeout(()=>{
            setinvalid('')
        }, 4000) 
    }

    }

    return(
        <div className="reg">

        <Box sx={{border: '2px solid rgba(0, 128, 0, 1)', borderRadius: '10px', width: '30vw', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContents: 'center', alignItems: 'center', padding: '30px'}}>
         
            <Button color="success" onClick={()=>{navigate('/')}}>Back to Homepage</Button>
       
        <Typography variant="h4" sx={{fontWeight: 'bolder', textAlign: 'center', margin: '20px auto', width: 'fit-content', color: 'rgba(0, 128, 0, 1)'}}>
                Student Email Sign Up
            </Typography>


{rollref?

<Studsigncomp myref={rollref}/>
:
<>
        <TextField onChange={(x)=>{setroll(x.target.value)}} sx={{margin: '10px'}} color='success' label="Enter Roll Number" variant="outlined" />

<Button onClick={signup} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '20px'}}>Next</Button>

<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>
</>
}

    






</Box>

</div>
    )
}