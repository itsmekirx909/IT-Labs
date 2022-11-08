import { RestartAlt } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkrespage, checkuser, getrollresults } from "./configs/fbase/fbasemethods";
import Navbar from "./navbar";

export default function Result(){
    let params = useParams()
let [islogged, setislogged] = useState(false)
let navigate = useNavigate()
let [rollno, setrollno] = useState('')
let [invalid, setinvalid] = useState('')
let [resdata, setresdata] = useState()

useEffect(()=>{
    checkuser()
    .then((data)=>{
        setislogged(true)
    })
    .catch((error)=>{
        if(params){
            navigate('/')
        }
    })

    checkrespage()
    .then((success)=>{
        if(success.check){
        }else{
            navigate('/')
        }
    })
    .catch(()=>{
        navigate('/')
    })

},[])

function res(){
    if(rollno !== ''){

        getrollresults(rollno)
        .then((data)=>{
            let checker = Object.values(data)

          let result

           checker.map((e)=>{
                if(e !== ''){
                   Object.values(e).filter((x)=>{
                        if(x.rollno == rollno){
result = x
                        }
                    })
                }
            })


setresdata(result)

        })
    }else{
        
            setinvalid('Please enter roll no before searching')
            setTimeout(() => {
                setinvalid('')
            }, 4000)
    }
}

    return(
        <div className='wholepage'>

<Navbar userlogged={islogged}/>

<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

<TextField onChange={(e)=>{setrollno(e.target.value)}} variant="standard" color='success' label='Search Roll no'/>
<Button color='success' onClick={res} variant="contained" sx={{margin: '10px'}}>Search</Button>

<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>

</Box>

<Box sx={{margin: '30px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    {resdata?
    <>
<Typography variant="h4">
    Roll No:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{resdata.rollno}</Typography> 
    </Typography>

    <Typography variant="h4">
    Marks:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{resdata.result}</Typography> 
    </Typography>

    <Typography variant="h4">
    Grade:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{resdata.pof}</Typography> 
    </Typography>
    </>
    :
   null}
</Box>

</div>


    
    
    )
}