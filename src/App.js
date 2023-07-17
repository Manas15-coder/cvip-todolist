import { useTab } from '@mui/base';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import {Box, Button, Container, TextField, Typography,List, ListItem, Checkbox, ListItemButton, ListItemText, ListItemSecondaryAction, IconButton, Divider, Paper} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

const App = () => {
  const [notes,setNotes]=useState([]);
  const [noteText,setNoteText]=useState('');
  const [edit,setEdit]=useState(-1);
  const [search,setSearch]=useState('');
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const storedNotes = localStorage.getItem('notes')
    if(storedNotes){
      try{
        setNotes(JSON.parse(storedNotes))
      }
    catch(error){
      console.error('Error while parsing',error)
      setNotes([])
    }
  }
  },[])
useEffect(()=>{
  localStorage.setItem('notes',JSON.stringify(notes))
},[notes])
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])


  const addNote = ()=>{

    if(noteText.trim()!==''){
      if(edit !==-1){
        const updatedNotes = [...notes]
        updatedNotes[edit].text=noteText;
        setNoteText(updatedNotes)
        setEdit(-1);
      }
      else{
        const newNote ={
          text:noteText,
          timestamp: new Date().toLocaleString(),
          completed:false
        }
        setNotes([...notes,newNote])
      }
      setNoteText('')
    }
  }

  const deleteNote = (id)=>{
    const updatetNotes = [...notes]
    updatetNotes.splice(id,1)
    setNotes(updatetNotes)
}

const editNote = (id)=>{
  setEdit(id)
  setNoteText(notes[id.text])
}

const completeNote = (id)=>{
  const updatedNotes = [...notes]
  updatedNotes[id].completed = !updatedNotes[id].completed
  setNotes(updatedNotes)
}
const clearComplete = (id)=>{
  const updatedNotes = notes.filter((note)=>!note.completed)
  setNotes(updatedNotes)
}

const searchNotes =(note)=>{
  if(search.trim()!=='')
  {
    return true
  }
  return note.text.toLowerCase().includes(search.toLowerCase())

}

  return (
    <>
    {
      loading ? <Loader/> :(
        <Container maxWidth='sm'>
          <Typography variant='h4' align='center' color='black' fontWeight='900' marginTop='10%'>To Do<Typography  variant='h4' display='inline' sx={{color:'white', fontWeight:'600'}}> List ...</Typography></Typography>
          <div style={{display:'flex', alignItems:'center'}}>
         <TextField variant='filled' label='Add Task'  value={noteText} onChange={(e)=>setNoteText(e.target.value)} sx={{marginTop:'10px',color:'white', border:'2px dashed white'}} fullWidth/>
         <Button variant='contained'sx={{padding:'16px',marginTop:'10px' ,background: 'linear-gradient(to right, #50c9c3, #96deda)'}} onClick={addNote} ><AddIcon/></Button>
       </div>
       <TextField variant='filled' label='Search Task' sx={{marginTop:'10px',border:'2px dashed white',text:'white'}} value={search} onChange={(e)=>setSearch(e.target.value)} fullWidth/>
       {
        notes.length === 0? ( <div style={{ alignItems:'center'}}><Typography variant='h3' sx={{color:'white',marginTop:'10%'}} align='center'>No Tasks !...</Typography>
        <img src='https://cdn-icons-png.flaticon.com/512/5058/5058432.png' height='100px' className='no-task'/></div>
        )
        :(
          <List sx={{width: '100%', maxHeight:'400px',bgcolor: 'background.paper',marginTop:'10px',overflowY:'scroll'}}>
             
             
          <Paper elevation={4}>
            {
              notes.filter(searchNotes).map((note,id)=>(
                <ListItem key={id}>
                  <ListItemButton>
                  <Checkbox checked={note.completed} onChange={()=>completeNote(id)}/>
                  {
                    id===edit?(
                      <TextField label='Edit Task' value={noteText} onChange={(e)=>setNoteText(e.target.value)}  />
                    )
                    :
                    (
                      <ListItemText primary={note.text} secondary={note.timestamp} style={note.completed ? {textDecoration:'line-through'}:{}}/> 
                    )
                  }
                  <ListItemSecondaryAction>
          
          {
            id === edit ? (
              <IconButton edge='end' onClick={()=>addNote()}><AddIcon/></IconButton>
            ):
            (
              <IconButton edge='end' color='primary' onClick={()=>editNote(id)}><EditIcon/></IconButton>
            )
          }
          <IconButton edge='end'  sx={{color:'red'}} onClick={()=>deleteNote()}><DeleteIcon/></IconButton>

        </ListItemSecondaryAction>
                  </ListItemButton>
                 
                </ListItem>
               
              ))
            }
           
            
          </Paper>
          

        
     
       
        
      </List>

        )
       }
         <Button variant='contained' fullWidth onClick={()=>clearComplete ()} sx={{  background: 'linear-gradient(to right, #7474bf, #348ac7)'}} endIcon={<ClearIcon/>}> Clear Completed </Button>
        </Container>
        
        
      )
    }
    </>
  )
}

export default App
