import {Card, Grid, TextField} from '@material-ui/core' 
import React,{useEffect, useState} from 'react'
function PersonCard({person,edit,save,setSave}){

  const [fName,setFName] = useState(person.firstName);
  const [lName,setLName] = useState(person.lastName);
  const [dob,setDOB] = useState(person.birthday);

  const saveChanges = (()=>{
    const firstName = fName;
    const lastName = lName;
    const birthday = dob;
    const id=person.id;
    const classes = person.classes

    fetch("http://localhost:8000/teachers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id,firstName,lastName,birthday,classes})
    })

  })

  useEffect(()=>{
      if(save===true){
        saveChanges();
        setSave(false);
      }
  })




    const formatClasses = ((classes)=>{
        if(classes){
          let result = "";
          let x = 0;
          for(x=0;x<classes.length;x++){
            if(x===0){
              result=classes[x];
            }
            else{
              result = result+", "+classes[x];
            }
          }
          return result;
        }
        else{
          return "No Classes Taught"
  
        }
        })

    return(<div style={{padding:2,justifyContent:"center"}}>
            <Card elevation="2" style={{width: '90vw',height: '5vw'}}>
            <Grid container item xs={12} spacing={1}>
            <Grid item xs={2}>
            {edit?(
            <div style={{paddingTop:12,paddingLeft:10}}>
            <TextField  onChange={(evt)=>{
        setLName(evt.target.value)
        }} 
        id="outlined-basic" label="Last Name" size="small" variant="outlined" defaultValue={lName}/>
            </div>):<p style={{textAlign:"center",fontSize:18}}>{lName}</p>}
            </Grid>
            <Grid item xs={2}>
            {edit?(
            <div style={{paddingTop:12,paddingLeft:10}}>
            <TextField onChange={(evt)=>{
        setFName(evt.target.value)
        }} id="outlined-basic" label="First Name" size="small" variant="outlined" defaultValue={fName}/>
            </div>):<p style={{textAlign:"center",fontSize:18}}>{fName}</p>}
            </Grid>
            <Grid item xs={2}>
            {edit?(
            <div style={{paddingTop:12,paddingLeft:10}}>
            <TextField onChange={(evt)=>{
        setDOB(evt.target.value)
        }} id="outlined-basic" label="Date of Birth" size="small" variant="outlined" defaultValue={dob}/>
            </div>):<p style={{textAlign:"center",fontSize:18}}>{dob}</p>}
            </Grid>
            <Grid item xs={6}>
            <p style={{textAlign:"center",fontSize:18}}>{formatClasses(person.classes)}</p>
            </Grid>
            </Grid>
            </Card>
        </div>)
}
export default PersonCard;