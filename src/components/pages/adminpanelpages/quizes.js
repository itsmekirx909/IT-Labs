import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletequiz, sendquizes } from "../../configs/fbase/fbasemethods";
import Selecter from "../../selecter";

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
    let [qoptionfields, setqoptionfields] = useState({
        correct: undefined,
        options: []
    })
    let [alloptfields, setalloptfields] = useState([])
    let [addquizbtn, setaddquizbtn] = useState(false)
    const [course, setcourse] = useState('')

    const handleChange = (x) => {
      setcourse(x.target.value);
    }
  

    let option = 'options'
    let [optionfields, setoptionfields] = useState([option, option, option, option])

    useEffect(()=>{
        if(location.state && location.state.quizdata){
        }else{
            navigate('/adminpanel')
        }
    },[])

    function totalq(){
        if(question && qoptionfields.correct && qoptionfields.options.length == (optionfields.length - 1)){
            questionfields.push(question)
            setquestionfields(questionfields)
            setquestion('')
            
            alloptfields.push(qoptionfields)
            setalloptfields(alloptfields)
            setqoptionfields({
                correct: undefined,
                options: []
            })

        }else{
            setinvalid1('Please fill all the fields before adding questions')
            setTimeout(() => {
                setinvalid1('')
            }, 4000) 
            
        }
        
    }
    

    function addquiz(){
        if(quizname && quiztime && questionfields.length > 0 && course){
            let obj = {
                quizname: quizname,
                quiztime: quiztime,
                questions: questionfields,
                options: alloptfields,
                coursename: course
            }

            sendquizes(obj)
            .then((success)=>{
                setaddquizbtn(false)
                setquizname('')
                setquiztime('')
                setquestionfields([])
                setalloptfields([])
                setcourse('')
            })
            .catch((error)=>{
alert('Could not be done at the moment')
            })
            
        }else{
            setinvalid3('Please fill all fields')
            setTimeout(() => {
                setinvalid3('')
            }, 4000)          
        }
    }


    return(
        <div className="wholepage">

        <Typography sx={{color: 'rgba(0, 128, 0, 1)', fontSize: 'larger', fontWeight: 'bolder', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            Quizes
            </Typography>

            {quizdata?

            quizdata.map((e, i)=>{
                return(
                    <Box key={i} className='quizes' sx={{fontSize: 'large', padding: '8px', margin: '10px', color: 'rgba(0, 128, 0, 1)', border: '1px solid rgba(0, 128, 0, 1)', borderRadius: '8px', minWidth: '140px', textAlign: 'center', cursor: 'pointer'}}>

                    <Box>
                    <Typography>
                       Quiz Name: {e.quizname}
                    </Typography>

                    <Typography>
                       Quiz Category: {e.coursename}
                    </Typography>

{e.questions.map((x, j)=>{
    return(
<Box key={j}  sx={{fontSize: 'large', padding: '8px', margin: '10px', color: 'rgba(0, 128, 0, 1)', border: '1px solid black', color: 'black', borderRadius: '8px', minWidth: '140px', textAlign: 'center', cursor: 'pointer'}}>
                    <Typography>
                       Question {j+1}: {x}
                    </Typography>

<Box>

<Typography sx={{color: 'rgba(0, 128, 0, 1)'}}>
   Correct Option: {e.options[j].correct}
</Typography>

{e.options[j].options.map((y, k)=>{
    return(

<Typography key={k}>
   Other Options: {y}
</Typography>
    
    )
})}

</Box>

</Box>

    )
})
}

                    </Box>


                    </Box>
                )
            }):
            null
            }



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



<Selecter function={handleChange} value={course}/>



    <Box sx={{width: '2 rem', margin: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  border: '2px solid rgba(0, 128, 0, 1)', borderRadius: '8px', padding: '5px 10px'}}>
    <TextField sx={{margin: '8px 0px' }} value={question} onChange={(e)=>{setquestion(e.target.value)}} variant='outlined' label='Enter Question' color='success'/>

{optionfields.map((e, i)=> {
    
    let labels = 'Correct Option'

    if(i > 0){
        labels = 'Options'
    }
    
return (
<TextField onChange={(e)=>{
if(labels === 'Correct Option'){
qoptionfields.correct = e.target.value
}else{
qoptionfields.options[i-1] = e.target.value
}

}} key={i} sx={{margin: '8px 0px' }} variant='standard' label={labels} color='success'/>
)
})
}


<Button sx={{margin: '8px auto'}} onClick={(e)=>{
    optionfields.push(option)
    setoptionfields(optionfields)
    setaddquizbtn(true)
}} color="success">Add Another Option</Button>

    <Button sx={{margin: '8px auto'}} onClick={totalq} color="success">Add Question</Button>
    </Box>

    <Typography sx={{pointerEvents: 'none'}} color='error'>{invalid1}</Typography>


    {questionfields.map((x, index) => {
        return (<div key={index}>
                                <Box sx={{width: '100%', margin: '10px'}}>
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
<div className="mid">
        <Button onClick={()=>{setaddquizbtn(true)}} variant='contained' color='success' sx={{width: '200px', padding: '14px', margin: '0px auto'}}>Add a Quiz</Button>
</div>
}

        </div>
    )
}