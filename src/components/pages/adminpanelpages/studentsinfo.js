import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";


export default function Studentsinfo(){
    let date = new Date()
    let year = date.getFullYear()
    let location = useLocation() 
    let navigate = useNavigate()
    let studentsdata = location.state.studentsdata

    useEffect(()=>{
        if(location.state && location.state.studentsdata){
        }else{
            navigate('/adminpanel')
        }
    },[])
    return(
        <>

        <Typography sx={{color: 'rgba(0, 128, 0, 1)', fontSize: 'larger', fontWeight: 'bolder', margin: '20px'}}>
            Student's Info
        </Typography>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">
            <Typography variant='h6' sx={{fontSize: 'medium', fontWeight: 'bolder' }}>
            Student's Name
            </Typography>
            </TableCell>
          <TableCell align="center">
          <Typography variant='h6' sx={{fontSize: 'medium', fontWeight: 'bolder' }}>
            Father's Name
            </Typography>
            </TableCell>
          <TableCell align="center">
            <Typography variant='h6' sx={{fontSize: 'medium', fontWeight: 'bolder' }}>
            Choice of course
            </Typography>
            </TableCell>
          <TableCell align="center">
          <Typography variant='h6' sx={{fontSize: 'medium', fontWeight: 'bolder' }}>
            CNIC
            </Typography>
            </TableCell>
          <TableCell align="center">
          <Typography variant='h6' sx={{fontSize: 'medium', fontWeight: 'bolder' }}>
            Age
            </Typography>
            </TableCell>
          </TableRow>
          </TableHead>

          <TableBody>
{
    studentsdata.map((data, i)=>{
let age = year - data.type1.dateofbirth.slice(0,4)
        return(

<TableRow key={i}>
<TableCell align="center">{data.type1.firstname + ' ' + data.type1.lastname}</TableCell>
<TableCell align="center">{data.type2.fathersname}</TableCell>
<TableCell align="center">{data.type3.course}</TableCell>
<TableCell align="center">{data.type1.cnic}</TableCell>
<TableCell align="center">{age < 0 || age > 80 || age === 0?
<>Invalid Age</>
:
age}</TableCell>
</TableRow>

     )
        })
}
</TableBody>
</Table>
        </TableContainer>
        </>
    )
}