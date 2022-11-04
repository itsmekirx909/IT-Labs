import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Parental(props){
    let [fathersname, setfathersname] = useState(undefined)
    let [fcontact, setfcontact] = useState(undefined)
    let [fcnic, setfcnic] = useState(undefined)
    let [invalid1, setinvalid1] = useState('')
    let [invalid2, setinvalid2] = useState('')

    let page2 = {
        fathersname: fathersname,
        fcnic: fcnic,
        fcontact: fcontact
    }

function values(){

    if(fathersname !== undefined && fcnic !== undefined && fcontact !== undefined){

page2.fathersname = fathersname
page2.fcnic = fcnic
page2.fcontact = fcontact

props.function(page2)

}

}

    return(
        <>
<TextField onChange={(e)=>{setfathersname(e.target.value)
values()
}}
onBlur={(e)=>{setfathersname(e.target.value)
    values()
    }} 
sx={{margin: '10px'}} id="outlined-basic" color='success' label="Father's Name" variant="outlined" />

<TextField onChange={(e)=>{setfcnic(e.target.value)
values()
}}
onBlur={(e)=>{setfcnic(e.target.value)
    let datatype = Number(e.target.value)
    if(isNaN(datatype)){
        e.target.value = ''
        setinvalid1('Enter numbers only')
        setTimeout(() => {
            setinvalid1('')
        }, 4000)    
    }else{
        values()
    }    }} 
sx={{margin: '10px'}} id="outlined-basic" color='success' label="Father's Contact No." variant="outlined" />
<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid1}</Typography>



<TextField onChange={(e)=>{setfcontact(e.target.value)
values()
}}
onBlur={(e)=>{setfcontact(e.target.value)
    let datatype = Number(e.target.value)
    if(isNaN(datatype)){
        e.target.value = ''
        setinvalid2('Enter numbers only')
        setTimeout(() => {
            setinvalid2('')
        }, 4000)    
    }else{
        values()
    }
    }} 
sx={{margin: '10px'}} id="outlined-basic" color='success' label="CNIC" variant="outlined" />
<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid2}</Typography>


        </>
    )
}