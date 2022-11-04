import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkuser } from '../configs/fbase/fbasemethods'
import Navbar from '../navbar'


export default function Homepage(){
let [adminav, setadminav] = useState('')
let params = useParams()
let [islogged, setislogged] = useState(false)
let navigate = useNavigate()

useEffect(()=>{
    checkuser()
    .then((data)=>{
        setislogged(true)
if(params !== data){
    navigate('/')
}
    })
    .catch((error)=>{
        if(params){
            navigate('/')
        }
    })
},[])

    return(
<div className='wholepage'>

<Navbar userlogged={islogged}/>

<Box sx={{height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
<Typography variant='h2' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '40px', color: 'rgba(0, 128, 0, 1)', alignSelf: 'center'}}>
IT Trainings Offering In IT-Labs

<div className='contents'>
<Button onClick={()=>{navigate('/studreg')}} variant='contained' color='success' sx={{width: '200px', padding: '14px'}}>Register Now</Button>
</div>

</Typography>
</Box>

</div>


    )
}