import { Celebration } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { border, Box } from "@mui/system";
import { useState } from "react";

export default function Courses(props){

    let compcourses = [
        {course: 'Front-End Web Development',
         fees: '5000rs',
         duration: '5 Months',
         sections: ['A', 'B', 'C']},

         {course: 'Back-End Web Development',
         fees: '5000rs',
         duration: '6 Months',
         sections: ['A', 'B']},

         {course: 'Block-Chain Development',
         fees: '8000rs',
         duration: '8 Months',
         sections: ['A', 'B', 'C']},

         {course: 'Flutter App Development',
         fees: '4000rs',
         duration: '4 Months',
         sections: ['A', 'B', 'C']},

         {course: 'Game Development',
         fees: '6000rs',
         duration: '5 Months',
         sections: ['Unity', 'Unreal Engine']}
    ]

let [coursename, setcoursename] = useState()
let [fees, setfees] = useState()
let [duration, setduration] = useState()
let [sections, setsections] = useState([])
let [showsections, setshowsections] = useState(false)
let [choicecourse, setchoicecourse] = useState(undefined)
let [choicesection, setchoicesection] = useState(undefined)
let [invalid, setinvalid] = useState('')

let page3 = {
    course: choicecourse,
    section: choicesection
}

function values(){
    if(choicecourse !== undefined && choicesection !== undefined){

    page3.course = choicecourse
    page3.section = choicesection
    
    props.function(page3)
    
}

    }


//modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid rgba(0, 128, 0, 1)',
    boxShadow: 24,
    p: 4,
    background: 'white',
    borderRadius: '10px'
  };

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


    function data(x){

compcourses.filter((e)=>{
if(e.course == x.target.value){
setcoursename(e.course)
setfees(e.fees)
setduration(e.duration)
setsections(e.sections)
}
})

    }

    return(
        <>

<h4>Available Courses</h4>

<FormControl>

<RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
{
compcourses.map((e, i)=>{
    return(
        <div key={i}>


            <FormControlLabel onClick={(e)=>{
                data(e)
                setshowsections(true)
                setchoicecourse(e.target.value)
                }} 
                onBlur={(e)=>{setchoicecourse(e.target.value)
                    values()
                    }} 
                color="success" value={e.course} control={<Radio />} label={e.course} />




        </div>
        
         
        )
})

}
</RadioGroup>
</FormControl>

{showsections?
<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>


<div>
    <h4>Sections</h4>


<FormControl>

<RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
{
sections.map((e, i)=>{
    return(
        <div key={i}>
            <FormControlLabel onClick={(e)=>{setchoicesection(e.target.value)}}
                            onBlur={(e)=>{setchoicesection(e.target.value)
                                values()
                                }} 
            value={e} control={<Radio />} label={e} />
        </div>
        

        )
})

}
</RadioGroup>
</FormControl>
</div>




    <Button onClick={handleOpen} color="success">
    Course Details
    </Button>



<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Course Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

<Typography variant="p" sx={{marginRight: '4px', fontSize: 'larger', fontWeight: 'bolder'}}>
    Course Name:
</Typography>
    <Typography variant="span">
    {coursename}
    </Typography>
    <br/>

<Typography variant="p" sx={{marginRight: '4px', fontSize: 'larger', fontWeight: 'bolder'}}>
    Fees:
</Typography>
    <Typography variant="span">
    {fees}
    </Typography>
    <br/>

<Typography variant="p" sx={{marginRight: '4px', fontSize: 'larger', fontWeight: 'bolder'}}>
    Duration:
</Typography>
    <Typography variant="span">
    {duration}
    </Typography>
<br/>

          </Typography>
        </Box>
      </Modal>

</Box>

: null
}

<Typography sx={{pointerEvents: 'none'}} variant="p" fontSize='15px' color='error'>{invalid}</Typography>


        </>
    )
}