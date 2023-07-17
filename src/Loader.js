import { Container, Typography } from '@mui/material'
import './App.css'
import React from 'react'

const Loader = () => {
  return (
    <Container align='center' className='container'>
         <Typography variant='h4' align='center' sx={{color:'white',fontWeight:'bold'}} className='heading'>To Do List</Typography>
         <Typography variant='h5' align='center' sx={{color:'white',fontWeight:'bold'}}>Manage Tasks Beautifully....</Typography>
         <img src='https://static.vecteezy.com/system/resources/thumbnails/019/868/315/small_2x/3d-minimal-to-do-list-goal-achievement-concept-checklist-reminder-clipboard-with-a-checklist-pen-and-bell-icon-3d-illustration-png.png' align='center' className='loader'/>
        <Typography variant='h5' align='center' sx={{color:'white',fontWeight:'bold'}}>Hang On Loading Your To Do .....</Typography>
    </Container>
    
  )
}

export default Loader
