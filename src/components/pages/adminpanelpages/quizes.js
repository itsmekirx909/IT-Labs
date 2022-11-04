import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletequiz, sendquizes } from "../../configs/fbase/fbasemethods";

export default function Quizes(){
    let location = useLocation() 
    let quizdata = location.state.quizdata
    let navigate = useNavigate()
    let [question, setquestion] = useState('')
    let [invalid1, setinvalid1] = useState('')
    let [invalid2, setinvalid2] = useState('')
    let [invalid3, setinvalid3] = useState('')
    let [quizname, setquizname] = useState('')
    let [quiztime, setquiztime] = useState('')
    let [questionfields, setquestionfields] = useState([])
    let [addquizbtn, setaddquizbtn] = useState(false)

    useEffect(()=>{
        if(location.state && location.state.quizdata){
        }else{
            navigate('/adminpanel')
        }
    },[])

    function totalq(){
        if(question){
            questionfields.push(question)
            setquestionfields(questionfields)
            setquestion('')
        }else{
            setinvalid1('Please fill the field before adding questions')
            setTimeout(() => {
                setinvalid1('')
            }, 4000) 
            
        }
        
    }
    

    function addquiz(){
        if(quizname && quiztime && questionfields.length > 0){
            let obj = {
                quizname: quizname,
                quiztime: quiztime,
                questions: questionfields
            }

            sendquizes(obj)
            .then((success)=>{
                setaddquizbtn(false)
                setquizname('')
                setquiztime('')
                setquestionfields([])
            })
            .catch((error)=>{
alert('Could not be done at the moment')
            })
            
        }else{
            setinvalid3('Please fill all fields')
            setTimeout(() => {
                setinvalid3('')
            }, 4000)          }
    }


    return(
        <div className="wholepage">

        <Typography sx={{color: 'rgba(0, 128, 0, 1)', fontSize: 'larger', fontWeight: 'bolder', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            Quizes
            </Typography>

            {quizdata?

            quizdata.map((e, i)=>{
                return(
                    <Typography className='quizes' key={i} sx={{fontSize: 'large', padding: '8px', margin: '10px', color: 'rgba(0, 128, 0, 1)', border: '1px solid rgba(0, 128, 0, 1)', borderRadius: '8px', minWidth: '140px', textAlign: 'center', cursor: 'pointer'}}>
                        {e.quizname}
                    </Typography>
                )
            }):
            null
            }

<div className="mid">
        <Button onClick={()=>{setaddquizbtn(true)}} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '0px auto'}}>Add a Quiz</Button>
</div>

{addquizbtn?
    <Box sx={{margin: '30px', display: 'flex', flexDirection: 'column'}}>
    <TextField onChange={(e)=>{setquizname(e.target.value)}} sx={{margin: '8px 0px' }} label='Quiz Name' variant='standard'/>

<TextField onChange={(e)=>{setquiztime(e.target.value)}}
onBlur={(e)=>{
let datatype = Number(e.target.value)
if(isNaN(datatype)){
e.target.value = ''
setinvalid2('Enter numbers only')
setTimeout(() => {
    setinvalid2('')
}, 4000)      
}

}} sx={{margin: '8px 0px' }} variant='outlined' label='Total Time (In Seconds)' color='success'/>
<Typography sx={{pointerEvents: 'none', marginBottom: '20px'}} color='error'>{invalid2}</Typography>


    <Box>
    <TextField sx={{margin: '8px 0px' }} value={question} onChange={(e)=>{setquestion(e.target.value)}} variant='outlined' label='Enter Question' color='success'/>
    <br/>
    </Box>
    <Button sx={{margin: '8px auto'}} onClick={totalq} color="success">Add Question</Button>

    <Typography sx={{pointerEvents: 'none'}} color='error'>{invalid1}</Typography>


    {questionfields.map((x, index) => {
        return (<div key={index}>
                                <Box sx={{width: '100%'}}>
                                <Typography variant="h6">Question No: {index + 1}</Typography>

                                <Typography sx={{fontSize: 'large', fontWeight: 'bold'}}>{x}</Typography>

                                </Box>
                            </div>)
                        })
                        }

<Button color='success'  variant="contained" onClick={addquiz}>Add Quiz</Button>
<Typography sx={{pointerEvents: 'none'}} color='error'>{invalid3}</Typography>



<Button sx={{margin: '10px auto'}} color='success' variant="contained" onClick={()=>{setaddquizbtn(false)}}>Cancel</Button>
</Box>
:
null
}

        </div>
    )
}