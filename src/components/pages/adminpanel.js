import { Button, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"
import Adminnavs from "../adminnavs"
import { checkuser, getquizes, getstudentsdata } from "../configs/fbase/fbasemethods"
import Navbar from "../navbar"
import Quizes from "./adminpanelpages/quizes"
import Studentsinfo from "./adminpanelpages/studentsinfo"

export default function Adminpanel(){
    let [studentsdata, setstudentsdata] = useState()
    let [quizdata, setquizdata] = useState()
    let pages = ['Students', 'Quizes']
    let [islogged, setislogged] = useState(true)
    let navigate = useNavigate()
    let [loader, setloader] = useState(true)

    useEffect(()=>{
        checkuser()
        .then((data)=>{
getdata()
        })
        .catch((error)=>{
                navigate('/')
        })
    },[])

    function nav2(e){
        if(e === 'Students'){
            navigate('/adminpanel/studentsinfo',{state: {studentsdata: studentsdata}})
        }else if(e === 'Quizes'){
            navigate('/adminpanel/quizes',{state: {quizdata: quizdata}})
        }
    }

    function getdata(){
        setloader(true)
        getstudentsdata()
        .then((data)=>{
            setloader(false)
            setstudentsdata(Object.values(data))
        })
        .catch(()=>{
            setloader(false)
            alert('Error Getting Data')
        })

        getquizes()
        .then((data)=>{
            setloader(false)
            setquizdata(Object.values(data))
        })
        .catch(()=>{
            setloader(false)
            alert('Error Getting Quizes')
        })
    }

    return(
<div className='wholepage type2'>

<Navbar userlogged={islogged}/>

{loader?
<CircularProgress sx={{margin: '20px auto', justifySelf: 'center'}} color="success"/>
:
<>
<Adminnavs function={nav2} pages={pages}/>

<Routes>
    <Route path="studentsinfo" element={<Studentsinfo/>}/>
    <Route path="quizes" element={<Quizes/>}/>
</Routes>


</>

}
</div>
    )
}