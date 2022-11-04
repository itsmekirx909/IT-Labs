import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Personal(props){
    let [firstname, setfirstname] = useState(undefined)
    let [lastname, setlastname] = useState(undefined)
    let [cnic, setcnic] = useState(undefined)
    let [contactno, setcontactno] = useState(undefined)
    let [dateofbirth, setdateofbirth] = useState(undefined)
    let date = new Date()
    let [invalid1, setinvalid1] = useState('')
    let [invalid2, setinvalid2] = useState('')
    let page1 = {
        firstname: firstname,
        lastname: lastname,
        cnic: cnic,
        contactno: contactno,
        dateofbirth: dateofbirth,
        registeredon: undefined
    }

function values(){
    if(firstname !== undefined && lastname !== undefined && cnic !== undefined && contactno !== undefined && contactno !== undefined && dateofbirth !== undefined){

        page1.firstname = firstname
        page1.lastname = lastname
        page1.cnic = cnic
        page1.contactno = contactno
        page1.dateofbirth = dateofbirth
        page1.registeredon = date
        props.function(page1)
        
    }
}


    return(
        <>
<TextField onChange={(e)=>{setfirstname(e.target.value)
values()
}} 
onBlur={(e)=>{setfirstname(e.target.value)
    values()
    }} sx={{margin: '10px'}} id="outlined-basic" color='success' label="First Name" variant="outlined" />

<TextField onChange={(e)=>{setlastname(e.target.value)
values()
}}
onBlur={(e)=>{setlastname(e.target.value)
    values()
    }} 
sx={{margin: '10px'}} id="outlined-basic" color='success' label="Last Name" variant="outlined" />

<TextField onChange={(e)=>{setcnic(e.target.value)
values()
}}
onBlur={(e)=>{setcnic(e.target.value)
    let datatype = Number(e.target.value)
    if(isNaN(datatype)){
        e.target.value = ''
        setinvalid1('Enter numbers only')
        setTimeout(() => {
            setinvalid1('')
        }, 4000)    
    }else{
        values()
    }

    }} 
sx={{margin: '10px'}} id="outlined-basic" color='success' label="CNIC" variant="outlined" />
<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid1}</Typography>



<TextField onChange={(e)=>{setcontactno(e.target.value)
values()
}}
onBlur={(e)=>{setcontactno(e.target.value)

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
sx={{margin: '10px'}} id="outlined-basic" color='success' label="Contact No." variant="outlined" />
<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid2}</Typography>



<TextField onChange={(e)=>{setdateofbirth(e.target.value)
values()
}}
onBlur={(e)=>{setdateofbirth(e.target.value)

values()
    }} 
sx={{margin: '10px'}} id="date" color="success" label="Date Of Birth" type="date"  InputLabelProps={{shrink: true,}}/>
 

        </>
    )
}