import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function Selecter(props) {

  const courses = ['Front-End Web Development',
  'Back-End Web Development',
  'Block-Chain Development',
  'Flutter App Development',
  'Game Development']

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="Course"
          onChange={(e)=>{props.function(e)}}
        >
            {courses.map((e, i)=>{
            return(
                <MenuItem key={i} value={e}>{e}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
