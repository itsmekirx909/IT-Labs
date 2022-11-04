import { Button } from "@mui/material";
import { Box } from "@mui/system";

export default function Adminnavs(props){
    let pages = props.pages
    return(

        <div className="navbar navbar2">
{
    pages.map((e, i)=>{
return(
  <Button onClick={(x)=>{props.function(x.target.value)}} value={e} className="btns" key={i} sx={{ color: 'rgb(230, 230, 230)', fontSize: 'large', padding: '10px', margin: '0px 20px' }}>{e}</Button>
)
    })
}
        </div>
    )
}