import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { getresults, setrespage } from "../../configs/fbase/fbasemethods";
import Selecter from "../../selecter";

export default function Adminresult() {
    const [course, setcourse] = useState('')
    let [invalid, setinvalid] = useState('')
    let [checker, setchecker] = useState(false)
    const [results, setresults] = useState([])

    const handleChange = (x) => {
      setcourse(x.target.value);
    }

    function getres(){
        if(course){
            getresults(course)
            .then((result)=>{
                setresults([...Object.values(result)])
            })
            .catch(()=>{
                alert('Data could not be extracted at the moment')
            })
        }else{
            setinvalid('Please select the course')
            setTimeout(() => {
                setinvalid('')
            }, 4000)          
        }
    }

    return (
        <div className="wholepage">

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    
            <Typography sx={{ color: 'rgba(0, 128, 0, 1)', fontSize: 'larger', fontWeight: 'bolder', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                Results
            </Typography>

<Box sx={{margin: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

    <FormControlLabel labelPlacement="start" color="success" control={<Switch value={false} onClick={(e)=>{
        if(checker){
            setchecker(false)
        }else{
            setchecker(true)
        }
    }}/>} label="Enable Results Page" />
    
<Button color='success' onClick={()=>{
    setrespage(checker)
    .then((success)=>{
    })
    .catch((error)=>{
        alert(error)
    })
}}>Save</Button>

    </Box>

<Selecter function={handleChange} value={course}/>

<Button onClick={getres} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '10px auto'}}>Search</Button>

<Typography sx={{pointerEvents: 'none'}} color='error'>{invalid}</Typography>


{results.map((e, i)=>{
    return(
        <Box key={i}>

<Typography variant="h4">
    Roll No:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{e.rollno}</Typography> 
    </Typography>

    <Typography variant="h4">
    Marks:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{e.result}</Typography> 
    </Typography>

    <Typography variant="h4">
    Grade:
    <Typography variant="span" sx={{color: 'rgba(0, 128, 0, 1)'}}>{e.pof}</Typography> 
    </Typography> 

        </Box>
    )
})}


</Box>

        </div>
    )
}