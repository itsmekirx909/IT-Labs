import image from './logo.png'
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { logout } from './configs/fbase/fbasemethods';

export default function Navbar(props){
    let navigate = useNavigate()

    function log(){
      logout()
      .then(()=>{
        navigate('/adminlogin')
      })
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <>
        <div className='navbar'>

        <Tooltip title="IT-Labs" placement="bottom">
            <img onClick={()=>{navigate('/')}} className='img' width='80px' src={image}/>
        </Tooltip>

{props.userlogged?

<>

<Avatar 
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={handleClick}
color='success' sx={{marginLeft: 'auto', marginRight: '20px', cursor: 'pointer', backgroundColor: 'green'}}></Avatar>
<Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  MenuListProps={{
    'aria-labelledby': 'basic-button',
  }}
>
  <MenuItem onClick={()=>{navigate('/adminpanel')}}>Dashboard</MenuItem>
  <MenuItem onClick={log}>Logout</MenuItem>
</Menu>
</>

      :
      <Button onClick={()=>{navigate('/adminlogin')}} variant='contained' color='primary' sx={{marginLeft: 'auto', marginRight: '20px', padding: '10px', width: '100px'}}>Login</Button>
}
        
        
        </div>
        </>
    )
}
