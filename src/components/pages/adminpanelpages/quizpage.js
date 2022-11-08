import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkuser } from "../../configs/fbase/fbasemethods";
import Navbar from "../../navbar";

export default function Quizpage(){
let [islogged, setislogged] = useState(false)
let navigate = useNavigate()
let params = useParams()

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


},[])
    return(
<div className='wholepage'>

<Navbar userlogged={islogged}/>


</div>
    )
}