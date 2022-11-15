import { Alert, Button, CircularProgress, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Stack from '@mui/material/Stack';
import Personal from "../personal";
import { useState } from "react";
import Parental from "../parental";
import Courses from "../courses";
import {datasubmit} from "../configs/fbase/fbasemethods";
import { useNavigate } from "react-router-dom";

export default function StudentRegister(){
    // snackbar
    
let [open, setopen] = useState(false)




// app

    let navigate = useNavigate()
    let [loader, setloader] = useState(false)
    let [invalid, setinvalid] = useState('')
    let [datas1, setdatas1] = useState()
    let [datas2, setdatas2] = useState()
    let [datas3, setdatas3] = useState()
    let [fulldata, setfulldata] = useState({
        type1: undefined,
        type2: undefined,
        type3: undefined
    })
    let [dis, setdis] = useState(true)
    let [nextsub, setnextsub] = useState('Next')
    let [progress, setprogress] = useState(0)
    let [pagenos, setpagenos] = useState(0)
    let pages = [<Personal function={backchek1}/>, <Parental function={backchek2}/>, <Courses function={backchek3}/>] 

    function store(){
        if(pagenos == 0){
            fulldata.type1 = datas1
            setfulldata(fulldata)
        }else if(pagenos == 1){
            fulldata.type2 = datas2
            setfulldata(fulldata)     

        }else if(pagenos == 2){
            fulldata.type3 = datas3
            setfulldata(fulldata)  
            if(fulldata.type3 !== undefined){

            setprogress(progress+34)

setloader(true)

datasubmit(fulldata)
.then((success)=>{
setloader(false)
setopen(true)
setTimeout(()=>{
    setopen(false)
    navigate('/')
},3000)

})
.catch((error)=>{
setloader(false)
    alert('Data could not be send at the moment try again in a few seconds')
})

            }else{
                setinvalid('Please select before submitting')
                setTimeout(() => {
                    setinvalid('')
                }, 4000)    }

        }

    }

    function backchek1(e){
        setdatas1(e)
    }

    function backchek2(e){
        setdatas2(e)
    }

    function backchek3(e){
        setdatas3(e)
    }





    return(
      <>
        <div className="reg">

        <Box sx={{border: '2px solid rgba(0, 128, 0, 1)', borderRadius: '10px', width: '40vw', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContents: 'center', alignItems: 'center', padding: '30px'}}>

        {loader?
        <CircularProgress sx={{margin: '20px'}} color="success"/>
:
<>
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress sx={{height: '8px', borderRadius: '10px'}} color="success" value={progress} variant='determinate'/>
            </Stack>

            <Button color="success" onClick={()=>{navigate('/')}}>Back to Homepage</Button>

            <Typography variant="h4" sx={{fontWeight: 'bolder', margin: '20px auto', width: 'fit-content', color: 'rgba(0, 128, 0, 1)'}}>
                Registration Form
            </Typography>

{pages[pagenos]}

<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>


    <Button color='success' onClick={()=>{
        if(pagenos > 0){
            setpagenos(--pagenos)
            setnextsub('Next')
            setprogress(progress-33)
        }

if(pagenos == 0 ){
    setdis(true)
}


    }} disabled={dis} sx={{marginRight: 'auto'}}>Previous</Button>



    <Button color='success' onClick={()=>{

store()

if(pagenos !== 2){

if(pagenos == 0){
    
    if(fulldata.type1 !== undefined ){
        setpagenos(++pagenos)
        setdis(false)
        setprogress(progress+33)
    }else{
        setinvalid('Please fill all fields before going to next page')
        setTimeout(() => {
            setinvalid('')
        }, 4000)    }
        
    }

   else if(pagenos == 1){
    
        if(fulldata.type2 !== undefined ){
            setpagenos(++pagenos)
            setdis(false)
            setprogress(progress+33)
        }else{
            setinvalid('Please fill all fields before going to next page')
            setTimeout(() => {
                setinvalid('')
            }, 4000)    }
            
        }
}

        if(pagenos == 2){
setnextsub('Submit')
        }


    }} sx={{marginLeft: 'auto'}}>{nextsub}</Button>
</Box>

<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>


<Button sx={{margin: '5px'}} color='success' variant='outlined' onClick={()=>{navigate('/studentsignup')}}>Already Registered</Button>
</>
}

        </Box>

        </div>

        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        message="Registered successfully"
      />


      </>
    )
}